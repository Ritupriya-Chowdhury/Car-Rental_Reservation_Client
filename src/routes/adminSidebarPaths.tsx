import AdminDashBoard from "../pages/Admin/AdminDashBoard";
import ManageUser from "../pages/Admin/ManageUser";

export const adminSidebarPaths=[
    
    {
      name: 'Dashboard',
      path: "dashboard",
      element: <AdminDashBoard  />,
    },
    {
      name: 'Manage User',
      path: "user-management",
      element:<ManageUser/>,
    },
  ]