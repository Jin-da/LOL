const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: { type: String },
  time: { type: String },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },//可能属于多个分类
  matches: [{
    icon1: { type: String },
    icon2: { type: String },
    name1: { type: String },
    name2: { type: String },
    time: { type: String },
    score: { type: String }
  }],

})
module.exports = mongoose.model('Match', schema, 'matches')
