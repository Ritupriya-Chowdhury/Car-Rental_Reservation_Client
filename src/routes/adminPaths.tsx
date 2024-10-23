import CarUpdate from "../components/AdminDashBoard/CarUpdate";
import CreateCar from "../components/AdminDashBoard/CreateCar";
import ExistingCarsPage from "../components/AdminDashBoard/ExistingCar";
import AdminDashBoard from "../pages/Admin/AdminDashBoard";

export const adminPaths=[
    
    {
      name: 'Dashboard',
      path: "dashboard",
      element: <AdminDashBoard  />,
    },
    {
      name: 'Create Car',
      path: "create-car",
      element:<CreateCar/>,
    },
    {
      name: 'Existing Car',
      path: "existing-car",
      element:<ExistingCarsPage/>,
    },
    {
      name: 'Update Car',
      path: "existing-car/update-car/:id",
      element:<CarUpdate/>,
    },
  ]