const mongoose = require('mongoose')

const { Schema, model } = mongoose

const PostSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, 'Title must be provided'],
      unique: [true, 'Title must be unique'],
      maxLength: [150, 'Title must have at most 150 characters'],
    },
    content: {
      type: String,
      require: [true, 'Content must be provided'],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: [true, 'Author must be provided'],
    },
    genre: {
      type: String,
      enum: [
        'Personal development',
        'Medical',
        'Coding',
        'Gaming',
        'Entertainment',
        'Nirvana',
      ],
      default: 'General',
    },
    thumbnail: {
      type: String,
      require: [true, 'Thumbnail must be provided'],
    },
    comment: {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
    },
  },
  { timestamps: true }
)
PostSchema.virtual('formattedDate').get(function () {
  return this.createdAt.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
})
module.exports = model('Post', PostSchema)
