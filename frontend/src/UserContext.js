import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext(null)
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('myContext')) || {}
  )
  useEffect(() => {
    localStorage.setItem('myContext', JSON.stringify(userInfo))
  }, [userInfo])
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}
