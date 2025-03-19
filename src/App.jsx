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
import AdminLogin from './pages/Admin/adminLogin.jsx'
import AdminDashboard from './pages/Admin/adminDashboard.jsx'
import AdminUsers from './pages/Admin/adminUsers.jsx'
import AdminWorkers from './pages/Admin/adminWorkers.jsx'
import AdminBookings from './pages/Admin/adminBookings.jsx'
import AdminServices from './pages/Admin/adminServices.jsx'
import ServicePage from './pages/Home/ServicePage.jsx'
import WorkerDetails from './pages/Home/WorkerDetail.jsx'
import WorkerBooking from './pages/Home/WorkerBooking.jsx'
import Bookings from './pages/Home/Booking.jsx'
import About from './pages/common page/About.jsx'
import Contact from './pages/common page/Contact.jsx'
import History from './pages/worker/history.jsx'
import Chat from './pages/common page/Chat.jsx'
import Wallet from './pages/worker/wallet.jsx'
import UserInfo from './pages/Home/UserInfo.jsx'
import NotFound from './pages/common page/404.jsx'
import Track from './pages/worker/track.jsx'
import Call from './pages/common page/Call.jsx'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProtectedAuthRoutes element={<Home/>}/>}/>
        <Route path='/auth' element={<ProtectedAuthRoutes element={<Authentication/>}/>}/>

        
        <Route path='/home'  element={<ProtectedRoutes element={<Home/>} requiredRole={['User']}/>}/>
        <Route path='/services'  element={<ProtectedRoutes element={<Services/>} requiredRole={['User']}/>}/>
        <Route path='/service/:id'  element={<ProtectedRoutes element={<ServicePage/>} requiredRole={['User']}/>}/>
        <Route path='/worker/:id'  element={<ProtectedRoutes element={<WorkerDetails/>} requiredRole={['User']}/>}/>
        <Route path='/worker/book/:id'  element={<ProtectedRoutes element={<WorkerBooking/>} requiredRole={['User']}/>}/>
        <Route path='/booking' element={<ProtectedRoutes element={<Bookings />} requiredRoles={['User']} />} />
        <Route path='/personal-info' element={<ProtectedRoutes element={<UserInfo />} requiredRoles={['User']} />} />
        <Route path='/chat' element={<ProtectedRoutes element={<Chat />} requiredRoles={['User','Worker']} />} />
        <Route path='/call/:callerId' element={<ProtectedRoutes element={<Call />} requiredRoles={['User','Worker']} />} />
        

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/otp' element={<OTP />} />
        <Route path='/role' element={<SelectionBox />}/>
        <Route path='/worker' element={<WorkerConfig />}/>


        <Route path='/dashboard' element={<ProtectedRoutes element={<Dashboard/>} requiredRole={['Worker']}/>}/>
        <Route path='/profile'  element={<ProtectedRoutes element={<Profile/>} requiredRole={['Worker']}/>}/>
        <Route path='/edit-profile'  element={<ProtectedRoutes element={<EditProfile/>} requiredRole={['Worker']}/>}/>
        <Route path='/history'  element={<ProtectedRoutes element={<History/>} requiredRole={['Worker']}/>}/>
        <Route path='/wallet'  element={<ProtectedRoutes element={<Wallet/>} requiredRole={['Worker']}/>}/>
        <Route path='/track/:id'  element={<ProtectedRoutes element={<Track/>} requiredRole={['Worker']}/>}/>

        
        <Route path='/admin/login'  element={<ProtectedAuthRoutes element={<AdminLogin/>}/>}/>
        <Route path='/admin/dashboard'  element={<ProtectedRoutes element={<AdminDashboard/>} requiredRole={['Admin']}/>}/>
        <Route path='/admin/users'  element={<ProtectedRoutes element={<AdminUsers/>} requiredRole={['Admin']}/>}/>
        <Route path='/admin/workers'  element={<ProtectedRoutes element={<AdminWorkers/>} requiredRole={['Admin']}/>}/>
        <Route path='/admin/bookings'  element={<ProtectedRoutes element={<AdminBookings/>} requiredRole={['Admin']}/>}/>
        <Route path='/admin/services'  element={<ProtectedRoutes element={<AdminServices/>} requiredRole={['Admin']}/>}/>

      </Routes>
     
    </div>
  )
}

export default App