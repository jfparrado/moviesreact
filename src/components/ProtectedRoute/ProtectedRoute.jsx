import React, { useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../context/authContext";

function ProtectedRoute({children}) {
 const {user, verifyToken } = useAuthContext()
    if(!user){
        return <Navigate to='/login'/>
    }
    verifyToken()
    return children
  }
export default ProtectedRoute 