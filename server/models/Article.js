const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  title: { type: String },
  avatar: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],//可能属于多个分类
  body: { type: String }
})
module.exports = mongoose.model('Article', schema)
