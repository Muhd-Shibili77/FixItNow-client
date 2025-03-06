 import React,{useState} from 'react'
 import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAdmin } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../services/AxiosInstance';
import { useNavigate } from 'react-router';

 function adminLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [LoginFormData,setLoginFormData]=useState({
        Email:"",
        Password:""
      })
      const handleLoginForm = (e)=>{
        setLoginFormData({...LoginFormData,[e.target.name]:e.target.value})
      }


      const handleLogin =async (e)=>{

        e.preventDefault()

    if (!LoginFormData.Email || !LoginFormData.Password) {
      toast.error("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(LoginFormData.Email)) {
      toast.error("Invalid email format!");
      return;
    }

    try{

      const response = await axiosInstance.post('/admin/login',{
        email:LoginFormData.Email,
        password: LoginFormData.Password
      })

      const {email,Token } = response.data.response;
      
      
      localStorage.setItem("token", Token);

      toast.success("Login successfull!");
      dispatch(loginAdmin(email))
      

      setLoginFormData({
        Email: "",
        Password: "",
      });

      
      
      setTimeout(() => navigate('/admin/dashboard'), 1000);

    }catch(error){
      console.error("Login Error:", error);
      const errorMessage = error.response
        ? error.response.data.message || "Invalid credentials. Please try again."
        : "Network error. Please check your internet connection.";

       toast.error(errorMessage);
    }
      }

   return (
    <div className="body-login">
    <div className={`container`}>
     
      <div className="form-box login">
        <form action="#" onSubmit={handleLogin}>
          <h1>Admin Login</h1>
          <div className="input-box">
            <input type="Email" placeholder="Email" name="Email" onChange={handleLoginForm} value={LoginFormData.Email}  />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" name="Password" onChange={handleLoginForm} value={LoginFormData.Password}  />
            <i className="bx bxs-lock-alt"></i>
          </div>
          
          <button type="submit" className="btn">
            Login
          </button>
          
        </form>
      </div>

   
      


      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
        </div>
      </div>
    </div>
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
  </div>
   )
 }
 
 export default adminLogin