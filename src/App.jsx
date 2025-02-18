import React from 'react'
import { Route, Routes } from 'react-router'
import Authentication from './pages/Authentication/Authentication.jsx'
import Selection from './pages/selection/Selection.jsx'
import Home from './pages/Home/Home.jsx'
import OTP from './components/OTP/OTP.jsx'
import SelectionBox from './components/SelectionBox/SelectionBox.jsx'
import WorkerConfig from './components/workerConfig/workerConfig.jsx'
import Dashboard from './pages/worker/dashboard.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/auth' element={<Authentication />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/otp' element={<OTP />}/>
        <Route path='/role' element={<SelectionBox />}/>
        <Route path='/worker' element={<WorkerConfig />}/>
        <Route path='/dashboard' element={<Dashboard />}/>

      </Routes>
     
    </div>
  )
}

export default App