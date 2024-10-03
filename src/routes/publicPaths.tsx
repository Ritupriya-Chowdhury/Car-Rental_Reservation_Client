import AboutUs from "../pages/About/AboutUs";
import CarDetails from "../pages/Car/CarDetails";
import CarList from "../pages/Car/Cars";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";

export const publicPaths=[
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "cars",
      element: <CarList/>,
    },
    {
      path: "cars/:id",
      element: <CarDetails/>,
    },
    {
      path: "about",
      element: <AboutUs />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
  ]