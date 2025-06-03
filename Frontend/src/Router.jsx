// router.js
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Mybots from "./pages/Mybots";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BotFlowCanvas from "./pages/Createbot";
import PageNotFound404 from "./pages/PageNotFound404";

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
    element: <PageNotFound404 />,
  },
  {
    path: "/createbot",
    element: <BotFlowCanvas />,
  },
]);

export default router;
