import { Outlet } from "react-router-dom"
import Navbar from "../Sheard/Navbar/Navbar"


const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout