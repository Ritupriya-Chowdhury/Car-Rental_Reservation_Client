// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { adminPaths } from "./adminPaths";
import { userPaths } from "./userPaths";
import { publicPaths } from "./publicPaths";
import { routeGenerator } from "../utils/routeGeneator";
import NotFoundPage from "../pages/Error/NotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: publicPaths,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <App />,
    children:  routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: <App />,
    children: routeGenerator(userPaths),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
