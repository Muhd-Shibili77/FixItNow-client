import React, { useState } from "react";
import image from "../../assets/repairmen-electricians.webp";
import { TbBrandCashapp } from "react-icons/tb";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa";


const BookingCard = ({ name, role, Phone, work, status, amount,bookingType,date,paymentStatus,bookingNo,isFeedback, onClick,bookingInfo,review }) => {
  

  const getStatusColor = (status) => {
    switch (status) {
      case "Requested":
        return "bg-orange-500 text-white";
      case "Pending":
        return "bg-amber-400 text-white";
      case "In Progress":
        return "bg-blue-500 text-white";
      case "Completed":
        return "bg-green-500 text-white";
      case "Rejected":
        return "bg-red-600 text-white";
      case "Cancelled":
        return "bg-red-400 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getReachingStatusColor = (status) => {
    switch (status) {
      case "notStarted":
        return "bg-gray-400 text-white";
      case "onTheWay":
        return "bg-yellow-500 text-black";
      case "arrived":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      className={` relative p-4 rounded-xl shadow-md w-70 md:w-79  cursor-pointer flex flex-col gap-4 bg-white`}
      
    >
      <button
          className="absolute top-2 right-2  text-gray-700 p-1 rounded-full cursor-pointer"
          onClick={bookingInfo}
        >
        <IoIosInformationCircleOutline size={23} />

  </button>
      <div className="flex items-center gap-4">
        <div className="w-26 h-26 overflow-hidden rounded-lg">
          <img
            src={image}
            alt="sample"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Worker Details */}
        <div className="flex flex-col flex-grow">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Name:</span> {name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Role:</span> {role}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Phone:</span> {Phone}
          </p>
          {bookingType === 'schedule' && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Scheduled:</span> {new Date(date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Small Detail Boxes */}
      {work !== "Rejected" ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 bg-gray-100 rounded-md text-center">
            <p className="text-xs font-bold text-gray-700">Booking No</p>
            <p className="text-sm text-gray-400">{bookingNo}</p>
          </div>
          <div className="p-2 bg-gray-100 rounded-md text-center">
            <p className="text-xs font-semibold text-gray-700">Work</p>
            <span
              className={`text-sm px-3 py-1 rounded-lg cursor-pointer ${getStatusColor(
                work
              )}`}
            >
              {work}
            </span>
          </div>
          <div className="p-2 bg-gray-100 rounded-md text-center">
            <p className="text-xs font-semibold text-gray-700">Status</p>
            <span
              className={`text-sm px-3 py-1 rounded-lg cursor-pointer ${getReachingStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          </div>
          <div className="p-2 bg-gray-100 rounded-md text-center">
            <p className="text-xs font-semibold text-gray-700">Amount</p>
            <p className="text-sm flex justify-center text-gray-400">
              INR {amount == null ? "0.00" : amount}
              {paymentStatus==true ? <IoCheckmarkDoneCircle size={20} className="text-green-700" /> : null}
            </p>
          </div>

        {work ==='Completed' && status === 'arrived' && amount != null && paymentStatus==false ?(
          <button
            className="bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer ml-23 w-25 flex justify-center py-1"
            onClick={onClick}
          >
            <TbBrandCashapp size={22} />
            Pay Now
          </button>
        ): work ==='Completed' && status === 'arrived' && amount != null && paymentStatus==true && isFeedback == false ?(
              <button
              className="bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 cursor-pointer ml-23 w-25 flex justify-center py-1"
              onClick={review}
            >
              <FaStar size={20} />

              rate
            </button>


        ):work ==='Completed' && status === 'arrived' && amount != null && paymentStatus==true && isFeedback == true ? (
          <button className=" text-indigo-400 rounded-lg  ml-6 w-60 px-1 py-2 flex justify-center items-center">
            Thank you for your feedback!
          </button>


        ):(null)}
        </div>
      ) : (
        <h1 className="text-2xl font-medium text-black bg-red-500 rounded-4xl w-45 ml-13   flex items-center justify-center mt-9">
          <span
            className={`text-sm px-3 py-1 rounded-lg cursor-default bg-red-500}`}
          >
            Rejected
          </span>
        </h1>
      )}

     
    </div>
  );
};

export default BookingCard;
