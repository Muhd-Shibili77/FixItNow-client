import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; 


const ProtectedAuthRoutes =({element}) =>{
    const token = localStorage.getItem('token')
    
    if(token){
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken?.role;
      
        if(userRole === 'Worker'){
            return <Navigate to={"/dashboard"}/>
        }
        if(userRole === 'User'){
            return <Navigate to={"/home"}/>
        }
        if(userRole === 'Admin'){
            return <Navigate to={"/admin/dashboard"}/>
        }
    }
    return element;
}

export default ProtectedAuthRoutes;