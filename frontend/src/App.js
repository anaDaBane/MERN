import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Header } from './components/header/Header'
import { Details } from './pages/details/Details'
import { Login } from './pages/login/Login'
import { Account } from './pages/account/Account'
import { Register } from './pages/login/Register'
import { Create } from './components/create/Create'
import { Footer } from './components/footer/Footer'
import { UserContextProvider } from './UserContext'
import { Update } from './pages/update/Update'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Header />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/account" element={<Account />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/update/:id" element={<Update />}></Route>
          </Routes>
          <Footer />
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
