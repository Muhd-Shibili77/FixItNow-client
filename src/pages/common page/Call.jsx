import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser, loginWoker } from '../../redux/authSlice';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import VideoAudioCall from '../../components/chat/VideoAudioCall';
const Call = () => {

    const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
       
        if (decodedUser.role == "User") {
          dispatch(loginUser(decodedUser));
        } else {
          dispatch(loginWoker(decodedUser));
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      
      <VideoAudioCall />
     

    
    </div>
  )
}

export default Call