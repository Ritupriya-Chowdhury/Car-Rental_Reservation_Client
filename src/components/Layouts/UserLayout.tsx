import { Outlet } from "react-router-dom"
import UserSidebar from "../Sheard/Navbar/UserSidebar"


const UserLayout = () => {
  return (
    <div>
      <UserSidebar/>
      <Outlet/>
    </div>
  )
}

export default UserLayout
