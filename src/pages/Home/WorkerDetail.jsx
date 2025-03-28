import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import WorkerBanner from "../../components/banner/WorkerBanner";
import WorkerDetail from "../../components/workerConfig/WorkerDetail";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { jwtDecode } from "jwt-decode";
import ChatButton from "../../components/button/ChatButton";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const WorkerDetails = () => {
  const { id } = useParams();
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
      <WorkerBanner name={'worker'} />
      <WorkerDetail workerId={id}/>
      <ToastContainer/>
      <Footer />

      <ChatButton/>
    </div>
  );
};

export default WorkerDetails;
