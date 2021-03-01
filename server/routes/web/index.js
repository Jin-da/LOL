module.exports = app => {
  const Category = require('../../models/Category')
  const Article = require('../../models/Article')
  const Hero = require('../../models/Hero')
  const Item = require('../../models/Item')

  const router = require('express').Router()
  app.use('/web/api', router)

  //给前端提供的用于获取文章信息的接口
  router.get('/news/list', async(req, res, next) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id }},//match 条件查询
      { $lookup: {//以某一个为主体 查另一个集合
        from: 'articles',//从哪个模型获取 默认为模型的小写复数
        localField: '_id',//以id
        foreignField: 'categories',//文章里的categories寻找localField和foreignField符合的
        as: 'newsList' //获取到后放入的集合名称
      }}
    ])
    //添加分类名
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name
        return news
      })
      return cat
    })

    res.send(cats)
  })

  //获取英雄列表
  router.get('/heroes/list', async(req, res, next) => {
    const parent = await Category.findOne({
      name: '英雄分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id }},//match 条件查询
      { $lookup: {//以某一个为主体 查另一个集合
        from: 'heroes',//从哪个模型获取 默认为模型的小写复数
        localField: '_id',//以id
        foreignField: 'categories',//在from的模型中对应的字段
        as: 'heroList' //获取到后放入的集合名称
      }}
    ])
    res.send(cats)
  })

  //文章详情接口
  router.get('/articles/:id', async (req, res, next) => {
    const data =  await Article.findById(req.params.id).lean()//通过req.params.id获取到id lean转化为纯粹的json对象
    
    // data.related = await Article.find().where({
    //   categories: { $in: data.categories }.//查出与调用该接口的文章的分类 查出同分类下的三个作为related传出
    //   aggregate([{ $sample: {size: 3 }}])
    // })
    data.related = await Article.aggregate([
      { $match : { categories: data.categories}},
      { $sample: {size: 3 }}
    ])
    res.send(data)
  })

  //英雄详情接口
  router.get('/heroes/:id', async (req, res, next) => {
    const data = await Hero.findById(req.params.id).populate('categories items1 items2').lean()
    res.send(data)//populate关联调用 将分类所有数据调出 否则返回的分类只有id
  })

  //赛事详情接口
  router.get('/matches/list', async (req, res, next) => {
    const parent = await Category.findOne({
      name: '赛事分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id }},//match 条件查询
      { $lookup: {//以某一个为主体 查另一个集合
        from: 'matches',//从哪个模型获取 默认为模型的小写复数√
        localField: '_id',//以id
        foreignField: 'category',//在from的模型中对应的字段√
        as: 'matchList' //获取到后放入的集合名称√
        //去Category中以_id找与mathces中有一致_id的category 放入matchList
      }}
    ])
    res.send(cats)
  })
  
}