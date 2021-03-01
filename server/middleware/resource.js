module.exports = options => {
  return async (req, res, next) => {
    // npm i inflection用于转化为类名形式
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)//将获取到的model放入req中使子路由中可以使用
    next()
  }
}