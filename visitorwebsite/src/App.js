import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import Home from './Pages/Home'
import Room from './Pages/Room'
import DoubleRoom from './Pages/DoubleRoom'
import PremiumRoom from './Pages/PremiumRoom'
import DeluxRoom from './Pages/DeluxRoom'
import FamilyRoom from './Pages/FamilyRoom'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Booknow from './Pages/Booknow'
import Profile from './Pages/Profile'



const App = () => {
  return (
    <div>

    <BrowserRouter>
    
    <Navbar/>

    <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/rooms' element={<Room/>}/>
        <Route path='/doubleroom' element={<DoubleRoom/>}/>
        <Route path='/premiumroom' element={<PremiumRoom/>}/>
        <Route path='/deluxroom' element={<DeluxRoom/>}/>
        <Route path='/familyroom' element={<FamilyRoom/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/booknow' element={<Booknow/>}/>
        <Route path='/profile' element={<Profile/>}/>
    </Routes>
    
    <Footer/>

    </BrowserRouter>

    </div>
  )
}

export default App