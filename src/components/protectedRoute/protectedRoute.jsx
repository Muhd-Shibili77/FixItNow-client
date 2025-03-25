import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../../services/interceptor";

const ProtectedRoutes = ({ element, requiredRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsAuthenticated(false);
        return; // Return early to prevent further execution
      }

      try {
        let decodedToken = jwtDecode(token);
        const expiryTime = decodedToken?.exp * 1000;

        if (Date.now() > expiryTime) {
          const newToken = await refreshToken();
          
          if (newToken) {
            localStorage.setItem("token", newToken);
            decodedToken = jwtDecode(newToken); // Decode new token
            setUserRole(decodedToken?.role);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        } else {
          setUserRole(decodedToken?.role);
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated || (requiredRoles && !requiredRoles.includes(userRole))) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoutes;
