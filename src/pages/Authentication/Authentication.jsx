import React, { useState,useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Authentication.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser,loginUser,loginWoker } from "../../redux/authSlice";
import SocialIcons from "../../components/button/socialIcons";
import axiosInstance from "../../services/AxiosInstance";

function Authentication() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [LoginFormData,setLoginFormData]=useState({
    LEmail:"",
    LPassword:""
  })
  const handleLoginForm = (e)=>{
    setLoginFormData({...LoginFormData,[e.target.name]:e.target.value})
  }

  const handleLogin = async(e)=>{
    e.preventDefault()

    if (!LoginFormData.LEmail || !LoginFormData.LPassword) {
      toast.error("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(LoginFormData.LEmail)) {
      toast.error("Invalid email format!");
      return;
    }

    try{

      const response = await axiosInstance.post("/auth/login", {
        email: LoginFormData.LEmail,
        password: LoginFormData.LPassword,
      },{withCredentials:true});
      

      const {role,email,Token } = response.data.response;
      
      const path = role ==='Worker'?'/dashboard':'/home'

      localStorage.setItem("token", Token);

      toast.success("Login successfull!");

      if(role === 'Worker'){
        
         dispatch(loginWoker(email))
      }else{
         dispatch(loginUser(email))
      }

      setLoginFormData({
        LEmail: "",
        LPassword: "",
      });

      
      
      setTimeout(() => navigate(path), 1000);

    }catch(error){
      console.error("Login Error:", error);
      const errorMessage = error.response
        ? error.response.data.message || "Invalid credentials. Please try again."
        : "Network error. Please check your internet connection.";

       toast.error(errorMessage);
    }



  }

  const [RegisterFormData, setRegisterFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    ConformPassword: "",
  });
  const handleRegisterForm =(e)=>{
    setRegisterFormData({...RegisterFormData,[e.target.name]: e.target.value })
  }


  const handleRegister = async (e)=>{

    e.preventDefault(); 

   
    if (!RegisterFormData.Username || !RegisterFormData.Email || !RegisterFormData.Password || !RegisterFormData.ConformPassword) {
      toast.error("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(RegisterFormData.Email)) {
      toast.error("Invalid email format!");
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (RegisterFormData.Password !== RegisterFormData.ConformPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    if (!strongPasswordRegex.test(RegisterFormData.Password)) {
      toast.error(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character!"
      );
      return;
    }
    



    try{

      dispatch(setUser({ user:RegisterFormData}));

     

      const response = await axiosInstance.post("/auth/sent-otp", {
        email: RegisterFormData.Email,
      });
      
      
      toast.success("OTP sented to you email");
      setTimeout(()=>{
        navigate('/otp')
      },2000)


      setRegisterFormData({
        Username: "",
        Email: "",
        Password: "",
        ConformPassword: "",
      });

    }catch(error){
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleSuccess = (message) => {
    toast.success(message);
  };

  // Function to handle Google login failure
  const handleGoogleError = (message) => {
    toast.error(message);
  };


  return (
    <div className="body-login">
    <div className={`container ${isActive ? "active" : ""}`}>
     
      <div className="form-box login">
        <form action="#" onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="Email" placeholder="Email" name="LEmail" onChange={handleLoginForm} value={LoginFormData.LEmail}  />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" name="LPassword" onChange={handleLoginForm} value={LoginFormData.LPassword}  />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="forgot-link">
            <a  onClick={()=>navigate('/forgetPassword')}>Forgot Password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <p>or login with social platforms</p>
           
          <SocialIcons handleGoogleSuccess={handleGoogleSuccess} handleGoogleError={handleGoogleError}/>
        </form>
      </div>

   
      <div className="form-box register">
        <form action="#" onSubmit={handleRegister}>
          <h1>Registration</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" name="Username" onChange={handleRegisterForm} value={RegisterFormData.Username}  />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" name="Email" onChange={handleRegisterForm} value={RegisterFormData.Email}  />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" name="Password" onChange={handleRegisterForm} value={RegisterFormData.Password}  />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confrom Password" name="ConformPassword" onChange={handleRegisterForm} value={RegisterFormData.ConformPassword}  />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <p>or register with social platforms</p>
          
          <SocialIcons handleGoogleSuccess={handleGoogleSuccess} handleGoogleError={handleGoogleError}/>
          
          
        </form>
      </div>


      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <button className="btn register-btn" onClick={() => setIsActive(true)}>
            Register
          </button>
        </div>

        <div className="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button className="btn login-btn" onClick={() => setIsActive(false)}>
            Login
          </button>
        </div>
      </div>
    </div>
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
  </div>
  );
}

export default Authentication;
