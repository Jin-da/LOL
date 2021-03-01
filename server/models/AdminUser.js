const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    select: false,//使其不能被查出来 避免重复加密
    set(val) {//npm i bcrypt 加密
      return require('bcrypt').hashSync(val, 10)//接收val并根据加密指数将val返回
    }
  },

})
module.exports = mongoose.model('AdminUser', schema)
