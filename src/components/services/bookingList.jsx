import React, { useEffect, useState } from "react";
import BookingCard from "../button/BookingCard";
import WorkerModal from "./WorkerModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings } from "../../redux/userSlice";
import StripePayment from "../Payments/StripePayment";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AxiosInstance from "../../services/AxiosInstance";
import { FaStar } from "react-icons/fa";



const bookingList = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [showReview,setShowReview] = useState(false)
  const [selectBookingInfo,setSelectBookingInfo] = useState(null)
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [rating,setRating]=useState(0)
  const [hover,setHover] = useState(null)
  const [review,setReview] = useState('')

  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.auth.loginUser);
  const userId = user?.userId;
  console.log(bookings)
  
  const handleSuccess =async (amount)=>{
    if (!selectedWorker) return;
    
    if (!amount){
      toast.error("amount is empty");
      return
    };
    
    try {

      const response = await AxiosInstance.post('/user/makePayment',{
        bookingId: selectedWorker.id,
        amount:amount,
      })

      if(response.status===200){
        toast.success("Payment successful!");
        setTimeout(() => {
            setShowPayment(false); 
            setSelectedWorker(null); 
            dispatch(fetchUserBookings(userId));
        }, 1500); 
      }else{
        throw new Error('Unexpected response')
      }
      
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment Failed! please try again");
    }

  }

  const submitReview =async ()=>{
    if (!selectedWorker) return
    const userId = selectedWorker.userId._id
    const workerId = selectedWorker.workerId._id
    const bookingId = selectedWorker.id

    if (!userId){
      toast.error("userId is empty");
      return
    };
    if (!workerId){
      toast.error("workerId is empty");
      return
    };
    if (!bookingId){
      toast.error("bookingId is empty");
      return
    };
    if (!rating){
      toast.error("rating is empty");
      return
    };
    if (!review || review.trim() == ''){
      toast.error("review is empty");
      return
    };
   
   
    try {
      
      const response = await AxiosInstance.post('/user/review',{
        user:userId,
        worker:workerId,
        booking:bookingId,
        rating:rating,
        review:review
      })

      if(response.status===200){
        toast.success("Thanks for your feedback!");
        setTimeout(() => {
            setShowReview(false); 
            setSelectedWorker(null); 
            setRating(0)
            setHover(null)
            setReview('')
            dispatch(fetchUserBookings(userId));
        }, 1500); 
      }else{
        throw new Error('Unexpected response')
      }
      
    } catch (error) {
      console.error("review error:", error);
      toast.error("review failed! please try again");
    }
    
  }

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserBookings(userId));
    }
  }, [dispatch, userId]);

    if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
      </div>
    );

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-gray-200  rounded-xl shadow-md p-10">
          {bookings ? (
            bookings?.map((data) => (
              <BookingCard
                key={data.id}
                name={data.workerId.name}
                role={data.serviceId.name}
                Phone={data.workerId.phone}
                work={data.workStatus}
                status={data.reachingStatus}
                amount={data.amount}
                bookingType={data.bookingType}
                date={data.date}
                paymentStatus={data.paymentStatus}
                bookingNo={data.bookingNo}
                isFeedback={data.isFeedback}
                bookingInfo={()=>setSelectBookingInfo(data)}
                onClick={() => {
                  setSelectedWorker(data);
                  setShowPayment(true)
                }}
                review={()=>{
                  setSelectedWorker(data)
                  setShowReview(true)
                }}
              />
            ))
          ) : (
            <h2 className="text-3xl font-bold text-center col-span-full text-red-500">
              No bookings available
            </h2>
          )}
        </div>
      </div>
      {selectBookingInfo && (
        <WorkerModal
          booking={selectBookingInfo}
          onClose={() => setSelectBookingInfo(null)}
        />
      )}
    
      {selectedWorker && showReview && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-md p-4 ">
          <div className="bg-white p-6 w-full max-w-xl relative rounded-xl shadow-2xl">
            <button className="absolute top-3 right-3 text-gray-600  font-extrabold hover:text-red-500 transition duration-300"
            onClick={()=>{
              setSelectedWorker(null)
              setShowReview(false)
              setRating(0)
              setHover(null)
              setReview('')
            
            }}
            >
              <IoIosCloseCircleOutline size={30} />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Leave a Review
            </h2>
            <div className="flex justify-center space-x-2 mb-4">
              {[...Array(5)].map((_,index)=>{
                const currentRating = index + 1
                return(
                  <FaStar
                  key={index}
                  size={40}
                  className={`cursor-pointer transition-colors
                    ${currentRating <= (hover || rating) ? "text-yellow-400":"text-gray-300"}
                    `}
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </div>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Write your review here..."
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                onClick={() => submitReview()}
              >
                 Leave a Review
           </button>
          </div>
        </div>
      )}


      {selectedWorker && showPayment && (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-md p-4">
            <div className="bg-white p-6 w-full max-w-xl relative rounded-xl shadow-2xl">
              
              <button 
                className="absolute top-3 right-3 text-gray-600  font-extrabold hover:text-red-500 transition duration-300"
                onClick={() => setShowPayment(false)}
              >
                <IoIosCloseCircleOutline size={30} />

              </button>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Complete Payment
              </h2>
              <StripePayment 
                bookingId={selectedWorker.id} 
                bookingNO={selectedWorker.bookingNo}
                amount={selectedWorker.amount}
                user={selectedWorker.userId.username}
                address={selectedWorker.address} 
                onSuccess={handleSuccess}
              />
          
              
             
            </div>
          </div>
          
          )}
          <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </section>
  );
};

export default bookingList;
