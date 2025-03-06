import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { FaEdit, FaTrash } from "react-icons/fa";

function ServiceButtonRight(props) {
  const navigate = useNavigate()
  const location = useLocation()
 

  const isAdmin = location.pathname === '/admin/services'
  
  const handleServicePage =()=>{
    if(!isAdmin){
      navigate(`/service/${props.id}`)
    }
    props.handleFunction()
  }

  return (
        <div  className={`bg-indigo-300 p-1 rounded-[50px_50px_50px_50px] shadow-sm  flex flex-col items-center justify-center sm:w-58 sm:h-48  w-42 h-40`} onClick={handleServicePage}>
            
            <img src={`http://localhost:3000/uploads/${props.image}`} className="w-14 h-14 mb-2" alt={props.name} />
            <h3 className="text-lg font-semibold">{props.name}</h3>
        </div>
  )
}


export { ServiceButtonRight };
