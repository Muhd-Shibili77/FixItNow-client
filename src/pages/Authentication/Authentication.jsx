import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Authentication.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser,loginUser } from "../../redux/authSlice";

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

      const response = await axios.post("http://localhost:3000/auth/login", {
        email: LoginFormData.LEmail,
        password: LoginFormData.LPassword,
      });
      
      const {role } = response.data.response;
      
      toast.success("Login successfull!");

      

      dispatch(loginUser({loginUser:LoginFormData.LEmail}))
      setLoginFormData({
        LEmail: "",
        LPassword: "",
      });

      const path = role ==='Worker'?'/dashboard':'/home'

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

    if (RegisterFormData.Password !== RegisterFormData.ConformPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (RegisterFormData.Password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }



    try{

      dispatch(setUser({ user:RegisterFormData}));

     

      const response = await axios.post("http://localhost:3000/auth/sent-otp", {
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


  return (
    <div className="body-login">
    <div className={`container ${isActive ? "active" : ""}`}>
     
      <div className="form-box login">
        <form action="#" onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="Email" placeholder="Email" name="LEmail" onChange={handleLoginForm} value={LoginFormData.LEmail} required />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" name="LPassword" onChange={handleLoginForm} value={LoginFormData.LPassword} required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <p>or login with social platforms</p>
          <div className="social-icons">
            <a href="#"><i className="bx bxl-google"></i></a>
            <a href="#"><i className="bx bxl-facebook"></i></a>
          </div>
        </form>
      </div>

   
      <div className="form-box register">
        <form action="#" onSubmit={handleRegister}>
          <h1>Registration</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" name="Username" onChange={handleRegisterForm} value={RegisterFormData.Username} required />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" name="Email" onChange={handleRegisterForm} value={RegisterFormData.Email} required />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" name="Password" onChange={handleRegisterForm} value={RegisterFormData.Password} required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confrom Password" name="ConformPassword" onChange={handleRegisterForm} value={RegisterFormData.ConformPassword} required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <p>or register with social platforms</p>
          <div className="social-icons">
            <a href="#"><i className="bx bxl-google"></i></a>
            <a href="#"><i className="bx bxl-facebook"></i></a>
          </div>
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
