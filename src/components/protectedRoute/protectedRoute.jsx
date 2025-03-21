import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; 

const ProtectedRoutes =({ element, requiredRoles })=>{
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/" />;
      }
    try {
         const decodedToken = jwtDecode(token)
         const userRole = decodedToken?.role;
         const expiryTime = decodedToken?.exp * 1000;   

         if (Date.now() > expiryTime) {
            localStorage.removeItem('token');
            return <Navigate to="/" />;
          }

          if (requiredRoles && !requiredRoles.includes(userRole)) {
            return <Navigate to="/" />;
        }


    } catch (error) {
         localStorage.removeItem('token');
         return <Navigate to="/" />;
    }  

    return element;
}


export default ProtectedRoutes;