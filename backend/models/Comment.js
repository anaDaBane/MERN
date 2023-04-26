const mongoose = require('mongoose')

const { Schema, model } = mongoose

const CommentSchema = new Schema({
  audience: {
    type: String,
    require: true,
  },
  audienceEmail: {
    type: String,
    require: true,
  },
  audienceComment: {
    type: String,
    maxLength: 500,
    minLength: 1,
  },
})

module.exports = model('Comment', CommentSchema)
