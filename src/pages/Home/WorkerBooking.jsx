import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ServiceBooking from '../../components/services/serviceBooking'
import { useDispatch,useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { jwtDecode } from "jwt-decode";
import ChatButton from '../../components/button/ChatButton'


const WorkerBooking = () => {
    const {id} = useParams() 
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(null); 
    

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          setUserId(decodedUser.userId);
          dispatch(loginUser(decodedUser));
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");
        }
      }
    }, [dispatch]);

   

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
        <Navbar userId={userId}/>
        <ServiceBooking workerId={id} />
       
        <Footer />
        <ChatButton/>
   </div>
    
  )
}

export default WorkerBooking