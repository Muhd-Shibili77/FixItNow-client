import React,{useEffect, useState} from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import WorkerBanner from '../../components/banner/WorkerBanner'
import AboutUs from '../../components/about&contact/AboutUs'
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode";  // Use named import
import { loginWoker,loginUser } from '../../redux/authSlice'
import ChatButton from '../../components/button/ChatButton'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const About = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null); 
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          setUserId(decodedUser.userId);
          if(decodedUser.role == 'User'){
            dispatch(loginUser(decodedUser));  
          }else{
            dispatch(loginWoker(decodedUser))
          }

        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");  
        }
      }
    }, [dispatch]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>
        <Navbar userId={userId}/>
        <WorkerBanner name={'About Our Company'}/>
        <AboutUs/>
        <ToastContainer/>
        <Footer/>
        <ChatButton/>
        
    </div>
  )
}

export default About