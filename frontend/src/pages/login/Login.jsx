import React, { useContext, useState } from 'react'
import './login.css'
import back from '../../assets/images/my-account.jpg'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'

export const Login = () => {
  const [username_email, setUsername_email] = useState('')
  const [password, setPassword] = useState('')
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [redirect, setRedirect] = useState(false)
  async function loginControl(e) {
    e.preventDefault()
    const response = await fetch('http://localhost:4000/api/v1/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username_email, password }),
      credentials: 'include',
    })
    if (!response.ok) return
    const data = await response.json()
    if (data) {
      setUserInfo({ ...userInfo, email: data.email, user: true })
      setRedirect(true)
    }
  }
  if (redirect) {
    return <Navigate to="/" />
  }
  return (
    <>
      <section className="login">
        <div className="containers">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Login</h3>
              <h1>My Account</h1>
            </div>
          </div>
          <form onSubmit={loginControl}>
            <span>Username or email address*</span>
            <input
              type="text"
              required
              value={username_email}
              onChange={(e) => setUsername_email(e.target.value)}
            />
            <span>Password*</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button">Log In</button>
            <Link to="/register">Register</Link>
          </form>
        </div>
      </section>
    </>
  )
}
