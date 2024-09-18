import { ReactNode } from "react"
import { useAppSelector } from "../../redux/hook"
import { useCurrentToken } from "../../redux/slices/authSlice"
import { Navigate } from "react-router-dom";



const ProtectedRoute =({children}: {children: ReactNode})=>{
    const token= useAppSelector(useCurrentToken);
     if(!token){
        return <Navigate to='signin' replace={true} />;
     }
    return children;

};


export default ProtectedRoute;