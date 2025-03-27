import React,{useRef,useState,useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router";
import axiosInstance from '../../services/AxiosInstance';

function OTP(props) {
    const navigate = useNavigate()
    const inputRef = useRef([])
    const [timeLeft,setTimeLeft]=useState(30)
    const [canResend,setCanResend]=useState(false)
    const [otp, setOtp] = useState(["", "", "", ""]);
    const user = useSelector((state) => state.auth.user);
   
    const handleSubmition = async (e)=>{
        e.preventDefault();
        const enteredOTP = otp.join(""); 
        
        try {
            const response = await axiosInstance.post("/auth/verify-otp", {
                email:user.Email,
                otp: enteredOTP,
              });

              
              
              toast.success("OTP verified");
              setTimeout(()=>{
                if(props.forgetPassword){
                    props.fn()
                }else{
                    navigate('/role')
                }
              },2000)
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }

        
    }



    useEffect(()=>{
        if(timeLeft > 0){
             const timer = setInterval(()=>{
                setTimeLeft((prev)=>prev-1)
             },1000)

             return () => clearInterval(timer);  
        }else{
            setCanResend(true)
        }
    },[timeLeft])

    const handleChange =(e,index)=>{
        const value = e.target.value.replace(/[^0-9]/g, "");
        e.target.value = value

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if(value && index < inputRef.current.length - 1 ){
            inputRef.current[index+1].focus();
        }
    }

    const handleKeyDown = (e,index)=>{
        if(e.key ==='Backspace' && !e.target.value && index > 0){
            inputRef.current[index-1].focus();
        }
    }

   const handleResendOTP = async () => {
    if (!canResend) return;

    if (!user?.Email) {
        toast.error("User email not found!");
        return;
    }

    try {
        const url = props.forgetPassword 
            ? "/auth/resendOtp" 
            : "/auth/resend-otp";

        

        const response = await axiosInstance.post(url, { email: user.Email });

        if (response.data.success) {
            toast.success("New OTP sent successfully!");
            
            setOtp(["", "", "", ""]);
            inputRef.current[0]?.focus();  
            setTimeLeft(30);
            setCanResend(false);
        } else {
            throw new Error(response.data.message || "Failed to resend OTP");
        }
    } catch (error) {
        console.error("Resend OTP Error:", error);
        toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
};
    



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-indigo-200">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
            <h1 className="text-xl font-bold text-center mb-6">Enter OTP</h1>
            <p className="text-gray-600 text-center mb-8">Please enter the four digit code</p>
            <div className="flex justify-center gap-4 mb-8">
            {[0,1,2,3].map((index)=>(
                 <input 
                 key={index}
                 ref={(el)=>(inputRef.current[index] = el)}
                 value={otp[index]}
                 type="text"
                 className="w-16 h-16 text-3xl text-center border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200"
                 maxLength={1} 
                 inputMode="numeric" 
                 onChange={(e) => handleChange(e,index)}
                 onKeyDown={(e)=> handleKeyDown(e,index)}
               />
            ))}
           
            </div>
            <button className={`w-full  text-white rounded-lg py-3 px-2  transition-colors mb-6
                ${timeLeft > 0 ? 'bg-indigo-200 hover:bg-indigo-300' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={timeLeft === 0} onClick={handleSubmition}
                >
                Submit</button>

            <div className='flex justify-between text-center text-gray-600'>
                <p>Didn't you receive the OTP? 
                 <span
                     className={`cursor-pointer ${
                        canResend
                         ? "text-indigo-500 hover:text-indigo-600"
                         : "text-gray-400 cursor-not-allowed"
                     }`}
                     onClick={canResend ? handleResendOTP : null}
                   >
                      Resend OTP
                   </span>
                </p>
                <div className=" text-gray-500">
                 OTP expires in : {timeLeft}s
               </div>
            </div>
        </div>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  )
}

export default OTP