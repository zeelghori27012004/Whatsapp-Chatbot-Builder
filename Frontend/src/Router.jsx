import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import PageNotFound404 from "./components/PageNotFound404";
import Login from "./pages/login";
import Register from "./pages/register";
import Projects from "./pages/Projects";
// import Mybots from "./pages/Mybots";
import PrivateRoute from "./components/Protectedroute";
// import CreateBot from "./components/Createbot";
import Createflow from "./components/Createflow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        ),
      },
      {
        path: "projects/:id",
        element: (
          <PrivateRoute>
            <Createflow />
          </PrivateRoute>
        ),
      },
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
]);

export default router;
