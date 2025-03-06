import React, { useEffect } from "react";

const BookingModal = ({ booking, onClose }) => {
  if (!booking) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
 
  return (
    <div className="fixed inset-0  flex justify-center items-center z-50 p-4 bg-transparent backdrop-blur-sm " onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          ✖
        </button>
        <h3 className="text-2xl font-semibold text-center mb-4 text-indigo-600">Booking Details</h3>
        <div className="space-y-3 text-gray-700">
          <p><strong>Worker Name:</strong> {booking.workerId.name}</p>
          <p><strong>Phone:</strong> {booking.workerId.phone}</p>
          <p><strong>Service:</strong> {booking.serviceId.name}</p>
          <p><strong>Booking Type:</strong> {booking.bookingType}</p>
          <p><strong>Placed At:</strong> {new Date(booking.placedAt).toLocaleString()}</p>
          <p><strong>Work Status:</strong> {booking.workStatus}</p>
          <p><strong>Reaching Status:</strong> {booking.reachingStatus}</p>
          <p><strong>Accepted:</strong> {booking.isAccepted ? "Yes" : "No"}</p>
          <p><strong>Amount:</strong> INR {booking.amount}</p>
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="font-semibold">Address</p>
            <p>{booking.address.name}</p>
            <p>{booking.address.address}</p>
            <p>{booking.address.city}, {booking.address.state} - {booking.address.pincode}</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-indigo-400 hover:bg-indigo-500 text-white px-6 py-2 rounded-md transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
