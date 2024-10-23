import AllBookings from "../../components/AdminDashBoard/BookingManagement/AllBookings";
import DashboardOverView from "../../components/AdminDashBoard/DashboardOverView";
import ManageCarPage from "../../components/AdminDashBoard/ManageCar";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

const AdminDashBoard = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  return (
    <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} min-h-screen md:pl-44 px-4`}>
      <div className="p-4 text-center ">
        
        <DashboardOverView/>
        <ManageCarPage/>
        <h1
        className={`text-2xl font-bold mb-4 text-left ml-12 ${
          theme === "dark" ? "text-yellow-400" : "text-black"
        }`}
      >
        Manage Bookings
      </h1>
        <AllBookings/>
      </div>
    </div>
  );
};

export default AdminDashBoard;
