// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/About/AboutUs";
import Booking from "../pages/Booking/Booking";
import Contact from "../pages/Contact/Contact";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App layout contains the Navbar and Outlet for child routes
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <AboutUs />,
      },
      {
        path: 'booking',
        element: <Booking />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

export default router;
