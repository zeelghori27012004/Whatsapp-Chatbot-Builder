import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import Mybots from "./pages/Mybots";
// import Dashboard from "./pages/dashboard"; // If you have a dashboard page
// import Navbar from "./components/Navbar"; // Optional: include if you added the Navbar

export default function App() {
  return (
    <>
      <div className="flex-col max-w-screen overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mybots" element={<Mybots />} />
        </Routes>
      </div>
    </>
  );
}
