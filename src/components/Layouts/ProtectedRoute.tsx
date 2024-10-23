import { Navigate} from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";



interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.auth); 


  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  if(user.role==='user')
{return <div>
 <UserLayout/>
</div>
}
  if(user.role==='admin')
{return <div>
 <AdminLayout/>
</div>
}
};

export default ProtectedRoute;
