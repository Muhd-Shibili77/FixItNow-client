import React,{useRef,useState,useEffect} from 'react'

function OTP() {
    const inputRef = useRef([])
    const [timeLeft,setTimeLeft]=useState(10)
    const [canResend,setCanResend]=useState(false)

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

        if(value && index < inputRef.current.length - 1 ){
            inputRef.current[index+1].focus();
        }
    }

    const handleKeyDown = (e,index)=>{
        if(e.key ==='Backspace' && !e.target.value && index > 0){
            inputRef.current[index-1].focus();
        }
    }

    const handleResendOTP = () => {
        
        setTimeLeft(10)
        setCanResend(false)
    }
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
                disabled={timeLeft === 0}
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
    </div>
  )
}

export default OTP