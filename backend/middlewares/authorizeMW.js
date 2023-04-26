const jwt = require('jsonwebtoken')
require('dotenv').config()
const authorizeMW = (req, res, next) => {
  const { token } = req.cookies
  const { username, email, userId } = jwt.verify(token, process.env.JWT_SECRET)
  if (!username || !email || !userId) {
    throw new Error('Invalid credentials')
  }
  console.log({ username, email, userId })
  req.author = { authorId: userId }
  next()
}

module.exports = authorizeMW
