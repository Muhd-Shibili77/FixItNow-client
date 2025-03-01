import React,{useEffect, useState} from 'react'
import BookingCard from '../button/BookingCard'
import WorkerModal from './WorkerModal';
import { useDispatch,useSelector } from 'react-redux';
import { fetchUserBookings } from '../../redux/userSlice';

const bookingList = () => {
    const dispatch = useDispatch();

    const [selectedWorker, setSelectedWorker] = useState(null);
    const { bookings, loading, error } = useSelector((state) => state.user);
 
    
  
    const user = useSelector((state) => state.auth.loginUser);
    const userId = user?.userId;

   
    useEffect(()=>{
        if(userId){
            dispatch(fetchUserBookings(userId))
        }
    },[dispatch,userId])

  return (
    <section className="py-12 bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-gray-200  rounded-xl shadow-md p-10">
                      {bookings && bookings.length >0 ?(
                            bookings?.map((data)=>(
                                
                                <BookingCard key={data.id} name={data.workerId.name} role={data.serviceId.name} Phone={data.workerId.phone} work={data.workStatus} status={data.reachingStatus} onClick={() => setSelectedWorker(data)}/>
                            ))
                      ):(
                        <h2 className="text-3xl font-bold text-center col-span-full text-red-500">No bookings available</h2>
                      )}   
              </div>
          </div>
          {selectedWorker && <WorkerModal booking={selectedWorker} onClose={() => setSelectedWorker(null)} />}
      </section>
  )
}

export default bookingList