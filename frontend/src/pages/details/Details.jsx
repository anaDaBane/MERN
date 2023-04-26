import React, { useEffect, useState } from 'react'
import './Details.css'
import { Navigate, useParams, Link } from 'react-router-dom'
import { BsPencilSquare } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
export const Details = () => {
  const { id } = useParams()
  const [blogs, setBlogs] = useState(null)
  const [redirect, setRedirect] = useState(false)
  async function deleteControl() {
    const response = await fetch(`http://localhost:4000/api/v1/post/${id}`, {
      credentials: 'include',
      method: 'DELETE',
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
      setBlogs(data)
    }
    fetchDate()
  }, [])
  if (redirect) {
    return <Navigate to="/" />
  }
  return (
    <>
      {blogs ? (
        <section className="singlePost">
          <div className="container">
            <div className="left">
              <img
                src={`http://localhost:4000/${blogs.thumbnail}`}
                alt="images"
              />
            </div>
            <div className="right">
              <div className="rowLr">
                <label className="genre">{blogs.genre}</label>
                <div className="buttons">
                  <Link to={`/update/${blogs._id}`} className="updateBtn">
                    <button className="button">
                      <BsPencilSquare />
                    </button>
                  </Link>
                  <button className="button" onClick={deleteControl}>
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
              <h1>{blogs.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: blogs.content }}></p>
            </div>
          </div>
        </section>
      ) : (
        <span>No</span>
      )}
    </>
  )
}
