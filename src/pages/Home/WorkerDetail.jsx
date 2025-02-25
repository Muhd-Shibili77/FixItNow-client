import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import WorkerBanner from "../../components/banner/WorkerBanner";
import WorkerDetail from "../../components/workerConfig/WorkerDetail";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { jwtDecode } from "jwt-decode";

const WorkerDetails = () => {
  const { id } = useParams();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      <Navbar />
      <WorkerBanner />
      <WorkerDetail workerId={id}/>
      <Footer />
    </div>
  );
};

export default WorkerDetails;
