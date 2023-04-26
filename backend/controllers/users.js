const { UnauthorizedError, BadRequestError } = require('../errors')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const logoutUser = async (req, res) => {
  return res
    .status(StatusCodes.OK)
    .cookie('token', '')
    .json({ msg: 'Logged Out' })
}

const loginUser = async (req, res) => {
  const { username_email, password } = req.body
  let userDoc = {}
  if (username_email.includes('@')) {
    userDoc = await User.findOne({
      email: username_email,
    })
  } else {
    userDoc = await User.findOne({
      username: username_email,
    })
  }

  if (!userDoc) {
    throw new UnauthorizedError('invalid credentials')
  }
  const isMatch = userDoc.comparePassword(password)
  if (!isMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .cookie('token', '')
      .json({ msg: 'Invalid credentials' })
  }
  const token = userDoc.generateJwt()
  res
    .status(StatusCodes.OK)
    .cookie('token', token)
    .json({ name: userDoc.name, email: userDoc.email })
}

const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  console.log({ username, email, password })
  const userDoc = await User.create({ username, email, password })

  if (!userDoc) {
    throw new BadRequestError('Bad Request Error')
  }
  const token = userDoc.generateJwt()
  res.status(StatusCodes.OK).cookie('token', token).json(userDoc)
}

module.exports = { logoutUser, loginUser, registerUser }
