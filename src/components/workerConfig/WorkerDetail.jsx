import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkerDetails } from "../../redux/workerSlice";
import { useNavigate } from 'react-router';
function Workerdetail({workerId}) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { data: worker, loading, error } = useSelector((state) => state.worker);
   
    const handleBook =()=>{
        navigate(`/worker/book/${workerId}`)
    }
    

    useEffect(() => {
            if (workerId) {
                
                dispatch(fetchWorkerDetails(workerId));
            }
        }, [dispatch, workerId]);
        

        if (loading)
            return (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
              </div>
            );
          
          if (error)
            return <p className="text-red-500">Error: {error}</p>;
          
          if (!worker) return null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 md:w-full w-90 max-w-2xl text-center relative">
        
        {/* Rating Box (Top Right) */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-black font-semibold px-3 py-1 rounded-lg shadow-md text-sm">
          ⭐ 4.5 / 5
        </div>

        {/* Profile Image */}
        <div className="relative">
          <img
            className="w-36 h-36 mx-auto rounded-full border-4 border-white -mt-20 shadow-md"
            src={`http://localhost:3000/uploads/${worker.profileImage}`}
            alt="Profile"
          />
        </div>

        {/* Worker Details */}
        <h2 className="text-3xl font-semibold mt-6">{worker?.name}</h2>
        <p className="text-gray-600">{worker?.service?.name}</p>
        <p className="text-gray-600">{worker?.experience} yrs experience</p>
        <p className="text-gray-800 font-semibold mt-2">{worker?.phone}</p>
        <p className="text-gray-500 text-sm mt-4 break-words">{worker?.about}</p>

        {/* Book Now Button (Bottom Right) */}
        <div className="flex justify-end mt-6">
          <button className="bg-indigo-400 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md cursor-pointer" onClick={ handleBook }>
            FixItNow
          </button>
        </div>

      </div>
    </div>
  );
}

export default Workerdetail;
