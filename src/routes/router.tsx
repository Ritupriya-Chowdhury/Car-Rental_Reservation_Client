import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import { adminPaths } from "./adminPaths";
import { userPaths } from "./userPaths";
import { publicPaths } from "./publicPaths";
import { routeGenerator } from "../utils/routeGeneator";
import NotFoundPage from "../pages/Error/NotFound";
import ForgotPassword from "../components/Login/ForgotPassword";
import ResetPassword from "../components/Login/ResetPassword";
import SignUp from "../pages/Register/Register";
import ProtectedRoute from "../components/Layouts/ProtectedRoute";
import Unauthorized from "../pages/Error/Unauthorized";
import { bothPaths } from "./bothPaths";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: publicPaths,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signin",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={['admin']} />, 
    children: routeGenerator(adminPaths),
    errorElement: <Unauthorized/>,
  },
  {
    path: "/user",
    element: <ProtectedRoute allowedRoles={['user']} />, 
    children: routeGenerator(userPaths),
    errorElement: <Unauthorized/>,
  },
  {
    path: "/",
    element: <ProtectedRoute allowedRoles={['user','admin']} />, 
    children: routeGenerator(bothPaths),
    errorElement: <Unauthorized/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
