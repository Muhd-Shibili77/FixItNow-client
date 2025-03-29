import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ChatApp from "../../components/chat/Chat";
import { useDispatch } from "react-redux";
import { loginUser, loginWoker } from "../../redux/authSlice";
import { jwtDecode } from "jwt-decode";

const Chat = () => {
  const dispatch = useDispatch();
 const [userId, setUserId] = useState(null); 
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUserId(decodedUser.userId);
        if (decodedUser.role == "User") {
          dispatch(loginUser(decodedUser));
        } else {
          dispatch(loginWoker(decodedUser));
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      <Navbar userId={userId}/>
      <ChatApp />

      <Footer />
    </div>
  );
};

export default Chat;
