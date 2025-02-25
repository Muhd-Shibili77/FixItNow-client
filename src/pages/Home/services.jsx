import React,{useState,useEffect} from 'react'
import ServiceList from '../../components/services/ServiceList'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import HeadBanner from '../../components/banner/HeadBanner'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/authSlice'
import { jwtDecode } from 'jwt-decode'


function services() {
  const [searchTerm, setSearchTerm] = useState("");

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
         <HeadBanner onSearch={setSearchTerm} />
         <ServiceList searchTerm={searchTerm} />
         
         <Footer/>
    </div>
  )
}

export default services