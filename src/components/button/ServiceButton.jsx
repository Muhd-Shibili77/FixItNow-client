import React from 'react'
import { useNavigate } from 'react-router'


function ServiceButtonRight(props) {
  const navigate = useNavigate()
  const handleServicePage =()=>{

    navigate(`/service/${props.id}`)
    
  }

  return (
        <div  className="bg-indigo-300 p-1 rounded-[50px_50px_50px_50px] shadow-sm cursor-pointer flex flex-col items-center justify-center w-55 h-40" onClick={handleServicePage}>
            <img src={`http://localhost:3000/uploads/${props.image}`} className="w-14 h-14 mb-2" alt={props.name} />
            <h3 className="text-lg font-semibold">{props.name}</h3>
        </div>
  )
}


export { ServiceButtonRight };
