import React, { useContext, useEffect } from 'react'

import { Category } from '../../components/category/Category'
import { Card } from '../../components/blog/Card'
import { UserContext } from '../../UserContext'
export const Home = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:4000/api/v1/post', {
        credentials: 'include',
      })
      const data = await response.json()
      setUserInfo({ ...userInfo, data })
    }
    fetchData()
  }, [])
  return (
    <>
      <Category />
      <Card />
    </>
  )
}
