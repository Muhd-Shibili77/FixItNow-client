import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/navbar/Navbar";
import WorkerProfile from "../../components/workerConfig/workerProfile";
import Footer from "../../components/Footer/Footer";
import { loginWoker } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import ChatButton from "../../components/button/ChatButton";

function Profile() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      <Navbar userId={userId} />
      <WorkerProfile />
      <Footer />
      <ChatButton />
    </div>
  );
}

export default Profile;
