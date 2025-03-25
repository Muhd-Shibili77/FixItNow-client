import React, { useState } from 'react'
import {  useNavigate } from 'react-router'

import { PiDotsThreeCircleVertical } from "react-icons/pi";

function ServiceButtonRight(props) {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false);
 

  const isAdmin = props.userType ==='Admin'
  
  const handleServicePage =()=>{
    if(!isAdmin){
      navigate(`/service/${props.id}`)
    }
  }

  const toggleDropdown = (event) => {
    event.stopPropagation(); 
    setShowDropdown((prev) => !prev);
  };

  return (
    <div
    className={`${!isAdmin ? "bg-indigo-300" : props.isDelete ? "bg-red-400" : "bg-indigo-300"} p-1 rounded-[50px] shadow-sm flex flex-col items-center justify-center relative sm:w-58 sm:h-48 w-42 h-40`}
    onClick={()=>{
      handleServicePage()
      setShowDropdown(false);
    }}
  >
    {isAdmin && (
      <div className="absolute top-4 right-7">
        <PiDotsThreeCircleVertical
          size={26}
          className="cursor-pointer"
          onClick={toggleDropdown}
        />
        {showDropdown && (
          <div className="absolute right-0 mt-1 w-20 bg-white shadow-lg rounded-lg py-1 z-10">
            <button
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                props.onEdit();
                setShowDropdown(false);
              }}
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                props.onDelete();
                setShowDropdown(false);
              }}
            >
              {props.isDelete ? "Restore":"Delete"}
            </button>
          </div>
        )}
      </div>
    )}
    <img
      src={props.image}
      className="w-14 h-14 mb-2"
      alt={props.name}
    />
    <h3 className="text-lg font-semibold">{props.name}</h3>
  </div>
  
  )
}


export { ServiceButtonRight };
