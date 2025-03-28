import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { loginUser } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ChatButton from '../../components/button/ChatButton';
import UserProfile from '../../components/Profile/UserProfile';
const UserInfo = () => {

    const [userId,setUserId] = useState()
    const dispatch = useDispatch();
    
    
useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        
        setUserId(decodedUser.userId)
        dispatch(loginUser(decodedUser));  
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");  
      }
    }
  }, [dispatch]);

  


  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>
    <Navbar userId={userId}/>
    
    <UserProfile userId={userId}/>
    <Footer/>
    <ChatButton/>
</div>  
  )
}

export default UserInfo