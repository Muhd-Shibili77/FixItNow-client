import React,{useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import WorkerBanner from '../../components/banner/WorkerBanner'
import BookingList from '../../components/services/bookingList'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/authSlice';
import { jwtDecode } from "jwt-decode"; 

const Booking = () => {
    const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        dispatch(loginUser(decodedUser));  
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");  
      }
    }
  }, [dispatch]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>
        <Navbar/>
        <WorkerBanner name={'bookings'}/>
        <BookingList/>
        <Footer/>
    </div>
   
  )
}

export default Booking