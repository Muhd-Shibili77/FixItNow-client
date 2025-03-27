import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, loginWoker } from "../../redux/authSlice";
import axiosInstance from "../../services/AxiosInstance";


const socialIcons = ({handleGoogleSuccess,handleGoogleError}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleSuccessResponse =async (tokenResponse)=>{
       try {
        
        
        const response = await axiosInstance.post('/auth/google',{
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
  

  return (
    <div className="social-icons">
      <a className="cursor-pointer" onClick={() => handleGoogleLogin()}>
        <i className="bx bxl-google"></i>
      </a>
     
    </div>
  );
};

export default socialIcons;
