import React from 'react'
import Authentication from './pages/Authentication/Authentication.jsx'
import Selection from './pages/selection/Selection.jsx'
import Home from './pages/Home/Home.jsx'
import OTP from './components/OTP/OTP.jsx'
import { Route, Routes } from 'react-router'
import SelectionBox from './components/SelectionBox/SelectionBox.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/auth' element={<Authentication />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/otp' element={<OTP />}/>
        <Route path='/role' element={<SelectionBox />}/>

      </Routes>
     
    </div>
  )
}

export default App