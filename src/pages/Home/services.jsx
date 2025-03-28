import React,{useState,useEffect} from 'react'
import ServiceList from '../../components/services/ServiceList'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import HeadBanner from '../../components/banner/HeadBanner'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/authSlice'
import { jwtDecode } from 'jwt-decode'
import ChatButton from '../../components/button/ChatButton'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(null); 
 const dispatch = useDispatch();

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
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>
         <Navbar userId={userId}/>
         <HeadBanner onSearch={setSearchTerm} />
         <ServiceList searchTerm={searchTerm} />
         
         <ToastContainer/>
         <Footer/>
         <ChatButton/>
    </div>
  )
}

export default services