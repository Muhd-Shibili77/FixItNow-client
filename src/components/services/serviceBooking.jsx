import React, { useEffect } from "react";
import { useState } from "react";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import name from "../../assets/technician.webp";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { fetchAddress } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { fetchWorkerDetails } from "../../redux/workerSlice";
import axiosInstance from "../../services/AxiosInstance";

const serviceBooking = ({ workerId }) => {
  const [location, setLocation] = useState(null);
  const [userLocation,setUserLocation] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.user);
  const { data:worker } = useSelector((state) => state.worker);
  
  useEffect(() => {
    if (workerId) {
      dispatch(fetchWorkerDetails(workerId));
    }
  }, [dispatch, workerId]);

  const [date, setDate] = useState("");
  const [bookingType, setBookingType] = useState("instant");
  const user = useSelector((state) => state.auth.loginUser);
  const userId = user?.userId;

  const [bookAddress, setBookAddress] = useState("");
  const [address, setAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchAddress(userId));
    }
  }, [dispatch, userId, address]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (
      !address.name ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode ||
      !address.country ||
      !address.phone
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Additional validation checks
    if (!/^\d{6}$/.test(address.pincode)) {
      toast.error("Pin Code must be a 6-digit number.");
      return;
    }

    if (!/^\d{10}$/.test(address.phone)) {
      toast.error("Phone number must be a 10-digit number.");
      return;
    }

    const updatedAddress = { ...address, userId: user?.userId };

    try {
      const response = await axiosInstance.post(
        "/user/addAddress",
        updatedAddress,{
          headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        }
      );
      toast.success("address added successfully!");
      setAddress({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error response:", error.response); // Log the error response
      console.error("Error details:", error.message); // Log general error details

      setAddress({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        phone: "",
      });

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleBook = async () => {
    if(!userLocation){
      toast.error('current location needed')
      return
    }
    if (!bookingType) {
      toast.error("must select bookingtype.");
      return;
    }
    if(bookingType==='schedule' && !date){
      toast.error('must select a date')
      return
    }
    if (!workerId) {
      toast.error("workerId required");
      return;
    }
    if (!userId) {
      toast.error("userId required");
      return;
    }
    if (!bookAddress) {
      toast.error("booking Address required");
      return;
    }
   

    try {
      const response = await axiosInstance.post(
        "/user/book-worker",
        { bookingType,date, workerId, userId, bookAddress,userLocation },{ headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
      );

      toast.success("worker booked successfully!");
      setTimeout(() => {
        navigate("/booking");
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getCurrentLocation =  ()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        async (position)=>{
          setUserLocation({latitude:position.coords.latitude,longitude:position.coords.longitude})
          const locationName = await reverseGeocode(position.coords.latitude,position.coords.longitude) 
          setLocation(locationName);
        },
        (error)=>{
          console.error("Error getting location:", error);
          setLocation("Location access denied");
        }
      )
    }else{
      setLocation('geolocation is not supporting')
    }
  }
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      
      if (response.data && response.data.display_name) {
        return response.data.display_name;
      }
      return "Location found, but address unknown";
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return "Could not determine address";
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen">
      {/* Address Form */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-1/2">
        <div className="relative w-full p-3 border rounded-md flex items-center gap-2 mt-9">
          <select
            className="w-full bg-transparent z-10 border-0 focus:outline-none"
            onClick={(e) => setBookAddress(e.target.value)}
          >
            <option>select your address</option>
            {data.map((address) => (
              <option key={address.id} value={address.id}>
                {address.name} - {address.address}, {address.city}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-lg font-semibold mb-4 mt-3">Add Your Address</h2>
        <form className="space-y-4" onSubmit={handleAddAddress}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={address.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-100"
          />
          <textarea
            placeholder="Address"
            name="address"
            value={address.address}
            onChange={handleChange}
            className="w-full h-20 p-3 rounded-md bg-gray-100"
          ></textarea>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="p-3 rounded-md bg-gray-100"
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="p-3 rounded-md bg-gray-100"
            />
            <input
              type="text"
              placeholder="Pin Code"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              className="p-3 rounded-md bg-gray-100"
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="p-3 rounded-md bg-gray-100"
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-100"
          />
          <button
            type="submit"
            className="w-full bg-indigo-400 hover:bg-indigo-600 text-white py-3 rounded-md"
          >
            ADD
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          ⚠ Providing your complete address along with the location is necessary
          to ensure our workers can reach you.
        </p>
      </div>

      {/* Booking Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-8 ">Your Location</h2>
        <div className="relative w-full p-3 border rounded-md flex items-center gap-2 mt-9">
          <MapPinIcon className="w-5 h-5" />
          <button 
            onClick={getCurrentLocation} 
            className="w-full bg-transparent z-10 border-0 focus:outline-none text-left"
          >
            {location ? location : "Get Current Location"}
           
          </button>
        </div>

          {worker ?(
        <div className="flex items-center bg-blue-100 p-4 rounded-lg mt-15">
             <img src={worker.profileImage} className="rounded-xl w-31" alt="Worker" />
          <div className="ml-4">
            <h3 className="font-semibold">{worker.username}</h3>
            <p className="text-sm text-gray-600">⭐ {worker.averageRating}/5 | {worker?.service?.name}</p>
          </div>
        </div>
        ):(
          <p>No worker found</p>
        )}
        <div className="mt-10 space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="booking"
              checked={bookingType === "instant"}
              onChange={() => setBookingType("instant")}
            />
            Instant Book
          </label>
          <label className="flex items-center gap-2 mt-3">
            <input
              type="radio"
              
              name="booking"
              checked={bookingType === "schedule"}
              onChange={() => setBookingType("schedule")}
            />
           Schedule 
          </label>
        </div>
        {bookingType === 'schedule' &&(
          <div className="relative mt-6 border p-3 rounded-md flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-gray-600"
            />
          </div>

        )}
        <div className="flex gap-4 mt-10">
          <button
            className="w-1/2 bg-red-400 hover:bg-red-500 text-white py-3 rounded-md cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="w-1/2  bg-indigo-400 hover:bg-indigo-600 text-white py-3 rounded-md"
            onClick={handleBook}
          >
            Confirm
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default serviceBooking;
