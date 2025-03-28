import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ChatButton from '../../components/button/ChatButton'
import WalletCard from '../../components/Payments/walletCard'
import { useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { loginWoker } from '../../redux/authSlice'
const wallet = () => {

  const dispatch = useDispatch();
  let userId;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
       
        const decodedUser = jwtDecode(token);
        userId = decodedUser.userId
        dispatch(loginWoker(decodedUser));  
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");  
      }
    }
  }, [dispatch]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>    
        <Navbar userId={userId}/>
        <WalletCard/>
        <Footer/>
        <ChatButton/>
    </div>
  )
}

export default wallet