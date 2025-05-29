import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            Bot Builder
          </Link>

          {/* Nav links */}
          <div className="space-x-6 hidden md:flex">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Register
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button (optional if you want to add later) */}
        </div>
      </div>
    </nav>
  );
}
