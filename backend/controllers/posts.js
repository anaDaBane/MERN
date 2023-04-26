const Post = require('../models/Post')
const { StatusCodes } = require('http-status-codes')
const fs = require('fs')
const getAllPosts = async (req, res) => {
  const postsDoc = await Post.find({}).populate('author', ['username'])
  res.status(StatusCodes.OK).json(postsDoc)
}

const createPost = async (req, res) => {
  const { originalname, path } = req.file
  const { title, content, summary, genre } = req.body
  const { authorId } = req.author
  const parts = originalname.split('.')
  const ext = parts[parts.length - 1]
  const newPath = path + '.' + ext
  fs.renameSync(path, newPath)
  const postDoc = await Post.create({
    title,
    content,
    summary,
    genre,
    thumbnail: newPath,
    author: authorId,
  })
  if (!postDoc) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Post does not created' })
  }
  res.status(StatusCodes.CREATED).json({ msg: 'Post created' })
}

const getPost = async (req, res) => {
  const { postId } = req.params
  const postDoc = await Post.findById(postId).populate('author', ['name'])
  if (!postDoc) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Post not found' })
  }
  res.status(StatusCodes.OK).json(postDoc)
}

const updatePost = async (req, res) => {
  let newPath = null
  if (req.file) {
    const { originalname, path } = req.file

    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    newPath = path + '.' + ext
    fs.renameSync(path, newPath)
  }

  const { postId } = req.params
  const { title, content, summary, genre } = req.body
  const { authorId } = req.author
  const {
    author: { _id: authorIdFromDB },
  } = await Post.findById(postId)

  if (JSON.stringify(authorIdFromDB) !== JSON.stringify(authorId)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Cannot updated' })
  }
  const postDoC = await Post.findById(postId)
  const postDoc = await Post.findByIdAndUpdate(
    postId,
    {
      title,
      content,
      summary,
      genre,
      thumbnail: newPath ? newPath : postDoC.thumbnail,
    },
    { new: true, runValidators: true }
  )
  if (!postDoc) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'not created' })
  }
  return res.status(StatusCodes.ACCEPTED).json(postDoc)
}

const deletePost = async (req, res) => {
  const { postId } = req.params
  const { authorId } = req.author

  const postDoc = await Post.findById(postId)

  if (JSON.stringify(postDoc.author) !== JSON.stringify(authorId)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Invalid Credentials' })
  }
  const postDoc1 = await Post.findByIdAndDelete(postId)
  if (!postDoc1) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Invalid Credentials' })
  }
  res.status(StatusCodes.OK).send()
}

module.exports = { getAllPosts, getPost, updatePost, deletePost, createPost }
