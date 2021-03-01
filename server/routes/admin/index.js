module.exports = app => {
  const assert = require('http-assert')//用于抛出错误
  const jwt = require('jsonwebtoken')//用于token验证
  const express = require('express')
  const router = express.Router({
    mergeParams: true //在app.use中定义了resource 想要在子路由router中使用 表示合并url参数
  })

  //登录检验中间件
  const authMiddleware = require('../../middleware/auth')
  //获取模型
  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  //新建分类
  router.post('/', async (req, res, next) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //更新单个分类
  router.put('/:id', async (req, res, next) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除单个分类
  router.delete('/:id', async (req, res, next) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  //获取列表
  router.get('/', async (req, res, next) => {
    let queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
      //setOptions(queryOptions) = populate('parent')
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)//populate表示需要查询parent的完整信息 放入传入的数据中
    res.send(items)
  })
  //获取单个分类详情
  router.get('/:id', async (req, res, next) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //上传图片
  const multer = require('multer')    // express本身获取不到上传的文件的数据 故需要中间件 npm i multer
  const upload = multer({dest: __dirname + '/../../uploads'})// 配置保存路径
  app.post('/admin/api/upload',authMiddleware(), upload.single('file'), async (req, res, next) => {//single表示接收上传的单个文件 file是network-headers-form data中的
    const file = req.file//因为使用了multer中间件 所以才有req.file 为传入的文件数据
    file.url = `http://localhost:3000/uploads/${file.filename}`//filename为上传图片的名称 index.js已经将uploads文件夹作为静态资源通过接口暴露 故前端可以通过后端返回的url访问图片
    res.send(file)
  })

  //登录
  app.post('/admin/api/login', async(req, res, next) => {
    const { username, password } = req.body
    //1根据用户名找用户
    const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne({
      username: username//前一个表示数据库的 后一个表示上面获取到的
    }).select('+password')//表示强制取出password 因为设置了密码不会被查到
    assert(user, 422, '用户不存在')
    // if(!user) {
    //   return res.status(422).send({//如果不存在则设置422状态码和返回信息返回
    //     message: '用户不存在'
    //   })
    // }

    //2校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)//对比 返回布尔值
    assert(isValid, 422, '密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }

    //3返回token
    // npm i jsonwebtoken 用于token验证
    const token = jwt.sign({id:user._id}, app.get('secret'))
    res.send({token,username})
  })

  // 错误处理函数（捕获异常）
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}