import MyBookings from "../../components/UserDashboard/BookingManagement/MyBookings";
import UserProfile from "../../components/UserDashboard/UserProfile";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

const UserDashBoard = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-700" : "bg-white"
      } md:pl-44 px-4 min-h-screen`}
    >
      <div className="p-4  ">
      <h1
        className={`text-2xl font-bold mb-4 ml-4 ${
          theme === "dark" ? "text-yellow-400" : "text-black"
        }`}
      >
        Personal Information
      </h1>
        <UserProfile />
      </div>
    
      <div className="p-4  ">
        
          <p className={`text-2xl font-bold mb-4 ml-4  ${
        theme === "dark" ? "text-yellow-400" : "text-black"
      }`}>My Bookings </p>
      <MyBookings/>
        
      </div>
    </div>
  );
};

export default UserDashBoard;
