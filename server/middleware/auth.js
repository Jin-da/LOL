//考虑到拓展性 所以将登录验证中间件作为一个函数导出 可以接收options进行拓展 使用时执行该函数以获取中间件
module.exports = options => {
  const assert = require('http-assert')//用于抛出错误
  const jwt = require('jsonwebtoken')//用于token验证
  const AdminUser = require('../models/AdminUser')

  return async(req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    //若没有token 报错 避免下一行中进行jwt比对因为没有token而报错
    assert(token, 401, '请先登录')
    const { id } = jwt.verify(token, req.app.get('secret'))
    //判断有无成功比对出id
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)//查询后将结果赋值给req
    //判断数据库中是否有该id的用户
    assert(req.user, 401, '请先登录')
    await next()
  }
}