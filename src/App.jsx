import React from 'react'
import { Route, Routes } from 'react-router'
import Authentication from './pages/Authentication/Authentication.jsx'
import Home from './pages/Home/Home.jsx'
import OTP from './components/OTP/OTP.jsx'
import SelectionBox from './components/SelectionBox/SelectionBox.jsx'
import WorkerConfig from './components/workerConfig/workerConfig.jsx'
import Dashboard from './pages/worker/dashboard.jsx'
import Profile from './pages/worker/profile.jsx'
import EditProfile from './pages/worker/editProfile.jsx'
import ProtectedAuthRoutes from './components/protectedRoute/protectedAuthRoute.jsx'
import ProtectedRoutes from './components/protectedRoute/protectedRoute.jsx'
import Services from './pages/Home/services.jsx'
import ServiceAdding from './pages/temporay/ServiceAdding.jsx'
import AdminLogin from './pages/Admin/adminLogin.jsx'
import AdminDashboard from './pages/Admin/adminDashboard.jsx'
import AdminUsers from './pages/Admin/adminUsers.jsx'
import ServicePage from './pages/Home/ServicePage.jsx'
import WorkerDetails from './pages/Home/WorkerDetail.jsx'
import WorkerBooking from './pages/Home/WorkerBooking.jsx'
import Bookings from './pages/Home/Booking.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProtectedAuthRoutes element={<Home/>}/>}/>
        <Route path='/auth' element={<ProtectedAuthRoutes element={<Authentication/>}/>}/>
        <Route path='/home'  element={<ProtectedRoutes element={<Home/>} requiredRole={'User'}/>}/>
        <Route path='/services'  element={<ProtectedRoutes element={<Services/>} requiredRole={'User'}/>}/>
        <Route path='/service/:id'  element={<ProtectedRoutes element={<ServicePage/>} requiredRole={'User'}/>}/>
        <Route path='/worker/:id'  element={<ProtectedRoutes element={<WorkerDetails/>} requiredRole={'User'}/>}/>
        <Route path='/worker/book/:id'  element={<ProtectedRoutes element={<WorkerBooking/>} requiredRole={'User'}/>}/>
        <Route path='/booking'  element={<ProtectedRoutes element={<Bookings/>} requiredRole={'User'}/>}/>
        <Route path='/otp' element={<OTP />} />
        <Route path='/role' element={<SelectionBox />}/>
        <Route path='/worker' element={<WorkerConfig />}/>
        <Route path='/dashboard' element={<ProtectedRoutes element={<Dashboard/>} requiredRole={'Worker'}/>}/>
        <Route path='/profile'  element={<ProtectedRoutes element={<Profile/>} requiredRole={'Worker'}/>}/>
        <Route path='/edit-profile'  element={<ProtectedRoutes element={<EditProfile/>} requiredRole={'Worker'}/>}/>

        <Route path='/serviceAdding'  element={<ServiceAdding />}/>
        <Route path='/admin/login'  element={<ProtectedAuthRoutes element={<AdminLogin/>}/>}/>
        <Route path='/admin/dashboard'  element={<ProtectedRoutes element={<AdminDashboard/>} requiredRole={'Admin'}/>}/>
        <Route path='/admin/users'  element={<ProtectedRoutes element={<AdminUsers/>} requiredRole={'Admin'}/>}/>

      </Routes>
     
    </div>
  )
}

export default App