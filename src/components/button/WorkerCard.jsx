import React from "react";
import { useNavigate } from 'react-router'

const WorkerCard = ({ name,image,experience,id,rating }) => {

  const navigate = useNavigate()
    const handleServicePage =()=>{
  
      navigate(`/worker/${id}`)
      
    }
  return (

    <div className={`p-4 rounded-xl shadow-md w-50 md:w-65 bg-indigo-200 cursor-pointer`} onClick={handleServicePage}>
      {/* Worker Image */}
      <div className="w-full h-36 overflow-hidden rounded-lg">
        <img src={`http://localhost:3000/uploads/${image}`} alt="sample" className="w-full h-full object-cover" />
      </div>

      {/* Worker Details */}
      <div className="mt-3 text-center">
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-md font-semibold">
            ⭐ {rating}/5
          </span>
        </div>
        <p className="text-sm text-gray-700 mt-1">{experience} yrs exp</p>
        <p className="text-sm text-gray-700">distance km away</p>
      </div>
    </div>
  );
};

export default WorkerCard;
