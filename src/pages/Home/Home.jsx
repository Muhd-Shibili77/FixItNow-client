import React,{useEffect} from 'react'
import { jwtDecode } from "jwt-decode";  // Use named import
import Navbar from '../../components/navbar/Navbar'
import Banner from '../../components/banner/Banner'
import SecondBanner from '../../components/secondBanner/secondBanner'
import Footer from '../../components/Footer/Footer'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/authSlice';
import ChatButton from '../../components/button/ChatButton';

function Home() {
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
         <Banner/>
         <SecondBanner/>
         <Footer/>
         
         <ChatButton/>
    </div>    
  )
}

export default Home