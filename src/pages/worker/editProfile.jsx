import React,{useEffect} from 'react'
import { jwtDecode } from "jwt-decode"; 
import Navbar from '../../components/navbar/Navbar'
import WorkerConfig from '../../components/workerConfig/workerConfig'
import Footer from '../../components/Footer/Footer'
import EditWorkerProfile from '../../components/workerConfig/editWorkerProfile'
import { loginWoker } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

function EditProfile() {

  const dispatch = useDispatch();
  let userId;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token)
        userId = decodedUser.userId;
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
         <EditWorkerProfile/>
         <Footer/>
    </div>
  )
}

export default EditProfile