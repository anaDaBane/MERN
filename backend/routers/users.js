const express = require('express')
const router = express.Router()

const { loginUser, logoutUser, registerUser } = require('../controllers/users')
const authorizeMW = require('../middlewares/authorizeMW')
router.route('/').post(loginUser)
router.route('/register').post(registerUser)
router.route('/logout').post(authorizeMW, logoutUser)
module.exports = router
