require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [3, 'Name must have at least 3 characters'],
    maxLength: [15, 'Name must have at most 15 characters'],
  },
  email: {
    type: String,
    unique: [true, 'Email must be unique'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email must be valid',
    ],
  },
  password: {
    type: String,
    require: [true, 'Password must be provided'],
    minLength: [6, 'Password must have at least 6 characters'],
  },
})

UserSchema.pre('save', function () {
  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
})

UserSchema.methods.generateJwt = function () {
  const token = jwt.sign(
    { username: this.username, email: this.email, userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
  return token
}

UserSchema.methods.comparePassword = function (canditatePassword) {
  const isMatch = bcrypt.compareSync(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
