import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
// import Dashboard from "./pages/dashboard"; // If you have a dashboard page
// import Navbar from "./components/Navbar"; // Optional: include if you added the Navbar

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
