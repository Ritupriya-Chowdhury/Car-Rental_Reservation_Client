import { Outlet } from "react-router-dom"
import Footer from "../Sheard/Footer/Footer"
import Navbar from "../Sheard/Navbar/Navbar"




const MainLayout = () => {
  return (
    <div>
     <Navbar />
      <Outlet/>
      <Footer/>
      
    </div>
  )
}

export default MainLayout