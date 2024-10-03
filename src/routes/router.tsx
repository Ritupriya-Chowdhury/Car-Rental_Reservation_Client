// src/routes/router.tsx
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
    element: <App />,
    children: routeGenerator(adminPaths),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/user",
    element: <App />,
    children: routeGenerator(userPaths),
    errorElement: <NotFoundPage />,
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
