// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext); // ✅ Correct usage
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
