import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginWoker } from '../../redux/authSlice';
import UserTracking from '../../components/services/userTracking';
import { useParams } from 'react-router';

const Track = () => {
    
    const dispatch = useDispatch();
    const {id} = useParams()
    const [userId, setUserId] = useState(null); 
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          setUserId(decodedUser.userId);
          dispatch(loginWoker(decodedUser));
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");
        }
      }
    }, [dispatch]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>  
      <UserTracking bookingId={id}/>
    </div>
  )
}

export default Track