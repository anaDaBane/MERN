const express = require('express')
const router = express.Router()
const authorizeMW = require('../middlewares/authorizeMW')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/posts')
router
  .route('/')
  .get(getAllPosts)
  .post(authorizeMW, upload.single('thumbnail'), createPost)
router
  .route('/:postId')
  .get(getPost)
  .patch(authorizeMW, upload.single('thumbnail'), updatePost)
  .delete(authorizeMW, deletePost)

module.exports = router
