import CustomerReview from "../components/Booking/CustomerReview";
import ChangePassword from "../components/UserDashboard/ChangePassword";
import UpdateProfile from "../components/UserDashboard/UpdateProfile";
import UserDashBoard from "../pages/User/UserDashBoard";


export const userPaths=[
    
    {
      name:'Dashboard',
      path: "dashboard",
      element: <UserDashBoard />,
    },
    {
      name:'Update Profile',
      path: "dashboard/update-profile",
      element:<UpdateProfile/>
    },
    {
      name:'Change Password',
      path: "dashboard/change-password",
      element:<ChangePassword/>
    },
    {
      name:'Customer Review',
      path: "car/:id/customer-review",
      element:<CustomerReview/>
    },
    
    
  ]