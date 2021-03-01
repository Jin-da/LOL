const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],//可能有多个定位
  scores: {
    harm: { type: Number },//伤害-difficult
    defense: { type: Number },//强韧-skill
    control: { type: Number },//控制-attack
    motility: { type: Number },//机动-survive
    function: { type: Number },//功能
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String }
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],//出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  motto: { type: String },//格言
  introduction: { type: String },//简介
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    motto: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' }
  }]
})
module.exports = mongoose.model('Hero', schema, 'heroes')
