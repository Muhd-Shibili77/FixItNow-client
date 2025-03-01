import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, loginWoker } from "../../redux/authSlice";



const socialIcons = ({handleGoogleSuccess,handleGoogleError}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleSuccessResponse =async (tokenResponse)=>{
       try {
        
        
        const response = await axios.post('http://localhost:3000/auth/google',{
            credential: tokenResponse,
        })

        if(response.data.needsUserSelection){
           navigate('/role',{
              state: { 
                email: response.data.email, 
                name: response.data.name 
              }
           })
           return;
        }

        const { role, email, Token } = response.data;
        const path = role === "Worker" ? "/dashboard" : "/home";
        localStorage.setItem("token", Token);

        handleGoogleSuccess("Google login successful!"); 
        
        if (role === "Worker") {
            dispatch(loginWoker(email));
          } else {
            dispatch(loginUser(email));
          }
    
          setTimeout(() => navigate(path), 1000);
        
       } catch (error) {
        console.error("Google login failed:", error);
        handleGoogleError("Google authentication failed");
       }
    }
    
  
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccessResponse,
    onError:() => handleGoogleError("Google login failed"),
    flow: "auth-code",

  });
  // const INSTAGRAM_CLIENT_ID = "your_instagram_client_id";
  // const REDIRECT_URI = "http://localhost:3000/auth/instagram/callback";

  // const handleInstagramLogin = () => {
  //   const authURL = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  //   window.location.href = authURL;
  // };

  return (
    <div className="social-icons">
      <a className="cursor-pointer" onClick={() => handleGoogleLogin()}>
        <i className="bx bxl-google"></i>
      </a>
      {/* <a className="cursor-pointer" onClick={handleInstagramLogin}>
        <i className="bx bxl-instagram"></i>
      </a>
      <a className="cursor-pointer">
        <i className="bx bxl-facebook"></i>
      </a> */}
    </div>
  );
};

export default socialIcons;
