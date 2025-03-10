import React,{useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import WorkerBanner from '../../components/banner/WorkerBanner'
import ContactForm from '../../components/about&contact/ContactForm'
import Footer from '../../components/Footer/Footer'
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode";  // Use named import
import { loginWoker,loginUser } from '../../redux/authSlice'
import ChatButton from '../../components/button/ChatButton'

const Contact = () => {

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
    <WorkerBanner name={'Contact Us'}/>
    <ContactForm/>
    <Footer/>
    <ChatButton/>
    
    </div>
  )
}

export default Contact