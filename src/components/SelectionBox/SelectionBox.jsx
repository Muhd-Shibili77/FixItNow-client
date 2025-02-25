import React,{useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch,useSelector } from 'react-redux';
import { unSetUser,loginUser } from '../../redux/authSlice';
import axios from "axios";
import { useNavigate } from "react-router";
import './SelectionBox.css'


function SelectionBox() {
  const navigate = useNavigate()
    const [selectedRole,setSelectRole]=useState('')
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch()
  

    const handleRole =(role)=>{
        setSelectRole(role)
    }

    const handleSubmition = async(e)=>{
      
        
        
        if(selectedRole === 'user'){
              try {
                const response = await axios.post("http://localhost:3000/auth/register", {
                    username: user.Username,
                    email: user.Email,
                    password: user.Password,
                    conformpassword: user.ConformPassword,
                  });
                  const Token = response?.data?.Token
                
                  localStorage.setItem("token", Token);

                  toast.success("user registration successfull");
                  dispatch(unSetUser());
                  dispatch(loginUser({loginUser:user.Email}))

                  setTimeout(()=>{
                    navigate('/home')
                  },2000)

            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }else{
          navigate('/worker')
        }
    }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-indigo-200">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Identify Yourself</h2>
          <p className="text-gray-600">Are You a Service Provider or a Client?</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className={`border-2 rounded-lg p-4  cursor-pointer transition-colors
            ${selectedRole ==='user' ? 'bg-indigo-50 border-indigo-200':'hover:border-indigo-200'}
            `}
            onClick={()=>handleRole('user')} role='button'
            >
            <h3 className="font-semibold text-gray-800 mb-2">User</h3>
            <p className="text-gray-600 text-sm">You can hire skilled Professionals</p>
          </div>

          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors
          
          ${selectedRole === 'worker' ?   'bg-indigo-50 border-indigo-200':'hover:border-indigo-200'}
          `}
          onClick={()=>handleRole('worker')} role='button'
          >
            <h3 className="font-semibold text-gray-800 mb-2">Worker</h3>
            <p className="text-gray-600 text-sm">You can offer your services on this platform</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={()=>handleRole('')}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors" onClick={()=>handleSubmition()}>
            Confirm
          </button>
        </div>
      </div>
          <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
     </div>
  );
}

export default SelectionBox;
