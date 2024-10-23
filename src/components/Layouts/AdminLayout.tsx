import { Outlet } from "react-router-dom"
import AdminSidebar from "../Sheard/Navbar/AdminSidebar"


const AdminLayout = () => {
  return (
    <div>
      <AdminSidebar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
