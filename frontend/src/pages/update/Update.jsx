import React, { useState, useRef, useEffect } from 'react'
import './update.css'
import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
}
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
]
export const Update = () => {
  const { id } = useParams()
  const [redirect, setRedirect] = useState(false)
  const fileInputRef = useRef(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [genre, setGenre] = useState('Personal development')

  function handleImageChange(e) {
    setThumbnail(e.target.files)
    const file = e.target.files[0]
    if (!file) {
      setImagePreviewUrl('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      return // user cancelled the file selection
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }
  async function createControl(e) {
    e.preventDefault()
    const data = new FormData()
    data.set('title', title)
    if (thumbnail?.[0]) data.set('thumbnail', thumbnail?.[0])

    data.set('content', content)
    data.set('genre', genre)

    const response = await fetch(`http://localhost:4000/api/v1/post/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: data,
    })
    if (response.ok) {
      setRedirect(true)
    }
  }
  useEffect(() => {
    async function fetchDate() {
      const response = await fetch(`http://localhost:4000/api/v1/post/${id}`, {
        credentials: 'include',
      })
      const data = await response.json()

      setTitle(data.title)
      setThumbnail(data.thumbnail)
      setGenre(data.genre)
      setContent(data.content)
    }
    fetchDate()
  }, [])

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <>
      <section className="newPost">
        <div className="container boxItems">
          <div className="img">
            {imagePreviewUrl ? (
              <img id="imagePreview" src={imagePreviewUrl} alt="images" />
            ) : (
              <h3 className="noPhoto">No Photo Yet</h3>
            )}
          </div>
          <form onSubmit={createControl}>
            <div className="inputFile flexCenter">
              <input
                type="file"
                id="myFileInput"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </div>
            <label htmlFor="title">Write Title:</label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="content">Write Content:</label>
            <div className="reactQuill" id="content">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={(newValue) => setContent(newValue)}
                formats={formats}
                modules={modules}
                placeholder="Type something here..."
              />
            </div>
            <label htmlFor="genre">Select a genre:</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="Personal development">Personal development</option>
              <option value="Medical">Medical</option>
              <option value="Coding">Coding</option>
              <option value="Gaming">Gaming</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Nirvana">Nirvana</option>
            </select>
            <button className="button">Update Post</button>
          </form>
        </div>
      </section>
    </>
  )
}
