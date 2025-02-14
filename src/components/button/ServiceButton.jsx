import React from 'react'
import Electrician from '../../assets/electrician.png'
function ServiceButtonRight(props) {
  return (
        <div className="bg-indigo-300 p-1 rounded-[100px_25px_25px_50px] shadow-sm cursor-pointer flex flex-col items-center justify-center w-55 h-40">
            <img src={props.image} className="w-14 h-14 mb-2" alt="Electrician" />
            <h3 className="text-lg font-semibold">{props.name}</h3>
        </div>
  )
}
function ServiceButtonLeft(props) {
  return (
        <div className="bg-indigo-300 p-1 rounded-[25px_100px_50px_25px] shadow-sm cursor-pointer flex flex-col items-center justify-center w-55 h-40">
             <img src={props.image} className="w-14 h-14 mb-2" alt="Electrician" />
             <h3 className="text-lg font-semibold">{props.name}</h3>
        </div>
  )
}

export { ServiceButtonRight, ServiceButtonLeft };
