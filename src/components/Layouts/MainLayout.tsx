import { Outlet } from "react-router-dom"
import Navbar from "../Sheard/Navbar/Navbar"
import Footer from "../Sheard/Footer/Footer"


const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default MainLayout