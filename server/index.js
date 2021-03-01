const express = require('express')
const app = express()

app.set('secret', 'asfafsaghew123')//给实例添加变量 密钥

app.use(require('cors')())//跨域模块
app.use(express.json())//用于接收前端post的数据 这样数据就能直接从req.body中获取
app.use('/uploads', express.static(__dirname + '/uploads'))//此接口用于将uploads文件夹的内容作为静态资源通过接口暴露给前端

require('./plugins/mongodb')(app)//将express实例app传入 连接数据库
require('./routes/admin')(app)//将express实例app传入 创建admin的路由
require('./routes/web')(app)//创建web的路由


app.listen(3000, () => {
  console.log('http://localhost:3000');
})