import React,{useEffect} from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import WorkerBanner from '../../components/banner/WorkerBanner'
import AboutUs from '../../components/about&contact/AboutUs'
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode";  // Use named import
import { loginWoker,loginUser } from '../../redux/authSlice'


const About = () => {
  const dispatch = useDispatch();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          
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
        <Navbar/>
        <WorkerBanner name={'About Our Company'}/>
        <AboutUs/>
        <Footer/>
        
    </div>
  )
}

export default About