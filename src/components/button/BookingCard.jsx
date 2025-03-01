import React from 'react'
import image from '../../assets/repairmen-electricians.webp'

const BookingCard = ({name,role,Phone,work,status,onClick}) => {
  return (
    <div className="p-4 rounded-xl shadow-md w-90 md:w-75  bg-white cursor-pointer flex flex-col gap-4" onClick={onClick}>
  {/* Worker Info Section */}
  <div className="flex items-center gap-4">
    {/* Worker Image */}
    <div className="w-26 h-26 overflow-hidden rounded-lg">
      <img src={image} alt="sample" className="w-full h-full object-cover" />
    </div>

    {/* Worker Details */}
    <div className="flex flex-col flex-grow">
      <p className="text-sm text-gray-600"><span className="font-semibold">Name:</span> {name}</p>
      <p className="text-sm text-gray-600"><span className="font-semibold">Role:</span> {role}</p>
      <p className="text-sm text-gray-600"><span className="font-semibold">Phone:</span> {Phone}</p>
    </div>
  </div>

  {/* Small Detail Boxes */}
  <div className="grid grid-cols-2 gap-3">
    <div className="p-2 bg-gray-100 rounded-md text-center">
      <p className="text-xs font-bold text-gray-700">Estimate Time</p>
      <p className="text-sm text-gray-400">00:00</p>
    </div>
    <div className="p-2 bg-gray-100 rounded-md text-center">
      <p className="text-xs font-semibold text-gray-700">Work</p>
      <p className="text-sm">{work}</p>
    </div>
    <div className="p-2 bg-gray-100 rounded-md text-center">
      <p className="text-xs font-semibold text-gray-700">Status</p>
      <p className="text-sm">{status}</p>
    </div>
    <div className="p-2 bg-gray-100 rounded-md text-center">
      <p className="text-xs font-semibold text-gray-700">Amount</p>
      <p className="text-sm text-gray-400">INR 0.00</p>
    </div>
  </div>
</div>


  )
}

export default BookingCard