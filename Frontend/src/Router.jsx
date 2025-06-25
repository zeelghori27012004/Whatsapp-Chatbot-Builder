import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import PageNotFound404 from "./components/PageNotFound404";
import Login from "./pages/login";
import Register from "./pages/register";
import Projects from "./pages/Projects";
import PrivateRoute from "./components/Protectedroute";

// import FlowCanvas from "./components/Flowcanvas";
import FlowBuilder from "./components/FlowBuilder/Flowbuilder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Login />,
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
    path: "projects/:id",
    element: (
      <PrivateRoute>
        <FlowBuilder />
      </PrivateRoute>
    ),
  },
]);

export default router;
