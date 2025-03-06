import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkerDetails } from "../../redux/workerSlice";
import { loginWoker } from  '../../redux/authSlice';
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";  

function workerProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const workerId = useSelector((state) => state.auth.loginWoker?.userId);
  
  const { data: worker, loading, error } = useSelector((state) => state.worker);
  
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          dispatch(loginWoker(decodedUser));  
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");  
        }
      }
    }, [dispatch]);


    const handleEditProfile =()=>{
        navigate('/edit-profile')
    }


    useEffect(() => {
        if (workerId) {
            
            dispatch(fetchWorkerDetails(workerId));
        }
    }, [dispatch, workerId]);
    

    if (loading)
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
        </div>
      );
    
    if (error)
      return <p className="text-red-500">Error: {error}</p>;
    
    

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl  text-center relative">
        {/* Edit Icon */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer z-10" onClick={handleEditProfile}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7 transform hover:scale-110 transition-all duration-200 ease-in-out"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182l-11.25 11.25-4.432 1.25 1.25-4.432 11.25-11.25z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 13.5V21H3.75A.75.75 0 0 1 3 20.25v-2.25"
            />
          </svg>
        </button>

        <div className="relative">
          <img
            className="w-35 h-35 mx-auto rounded-full border-3 border-white -mt-20 shadow-md"
            src={`http://localhost:3000/uploads/${worker?.profileImage}`}
            alt="Profile"
          />
        </div>

        <h2 className="text-3xl font-semibold mt-6">{worker?.name}</h2>
        <p className="text-gray-600">{worker?.service?.name}</p>
        <p className="text-gray-600">{worker?.experience} yrs experience</p>
        <p className="text-gray-800 font-semibold mt-2">{worker?.phone}</p>
        <p className="text-gray-500 text-s mt-4 break-words">{worker?.about}</p>
      </div>
    </div>
  );
}

export default workerProfile;
