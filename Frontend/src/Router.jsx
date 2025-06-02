// router.js
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Mybots from "./pages/Mybots";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound404 from "./pages/NotFound404"; // Match the file name with component name
import BotFlowCanvas from "./pages/Createbot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "mybots", element: <Mybots /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
  {
    path: "/createbot",
    element: <BotFlowCanvas />,
  },
]);

export default router;
