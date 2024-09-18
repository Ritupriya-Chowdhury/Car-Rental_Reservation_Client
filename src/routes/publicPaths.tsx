import AboutUs from "../pages/About/AboutUs";
import Booking from "../pages/Booking/Booking";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";

export const publicPaths=[
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "about",
      element: <AboutUs />,
    },
    {
      path: "booking",
      element: <Booking />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
  ]