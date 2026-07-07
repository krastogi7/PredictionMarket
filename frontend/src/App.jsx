import { useState } from 'react'

import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './pages/Navbar'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import ProfilePage from './pages/ProfilePage'
import CreatePage from './pages/CreatePage'
import MarketPage from './pages/MarketPage'

function App() {
  return (
    <BrowserRouter>
      {localStorage.getItem("token") !== null ? <Navbar />:""}
      <Routes> 
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/browse" element={<BrowsePage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/browse/:marketId" element={<MarketPage />}></Route>
        
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
