import React,{useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { jwtDecode } from "jwt-decode";  
import { useDispatch } from 'react-redux'
import { loginWoker } from '../../redux/authSlice';
import Footer from '../../components/Footer/Footer';
import JobList from '../../components/workerConfig/ServiceList';

function dashboard() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
       
        const decodedUser = jwtDecode(token);
        dispatch(loginWoker(decodedUser));  
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");  
      }
    }
  }, [dispatch]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>    
        <Navbar/>

        <JobList/>
        <Footer/>
    </div>
  )
}

export default dashboard