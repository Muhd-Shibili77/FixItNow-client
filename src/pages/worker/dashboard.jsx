import React,{useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { jwtDecode } from "jwt-decode";  
import { useDispatch } from 'react-redux'
import { loginWoker } from '../../redux/authSlice';
import Footer from '../../components/Footer/Footer';
import JobList from '../../components/workerConfig/ServiceList';
import ChatButton from '../../components/button/ChatButton';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function dashboard() {

  const dispatch = useDispatch();
    const [userId, setUserId] = useState(null); 
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          setUserId(decodedUser.userId);
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
        <JobList/>
        <ToastContainer/>
        <Footer/>
        <ChatButton/>
    </div>
  )
}

export default dashboard