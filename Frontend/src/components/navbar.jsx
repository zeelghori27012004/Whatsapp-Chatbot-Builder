import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChange"));
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("tokenChange", handleStorageChange);
    return () => window.removeEventListener("tokenChange", handleStorageChange);
  }, []);

  return (
    <nav className="bg-white shadow-md w-full z-50 max-w-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            Bot Builder
          </Link>
          {/* Nav links and logout button */}
          <div className="flex items-center space-x-6">
            {isLoggedIn && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600 transition"
                }
              >
                Dashboard
              </NavLink>
            )}
            {!isLoggedIn && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-blue-600 transition"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-blue-600 transition"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="ml-4 bg-blue-600 hover:bg-blue-500 text-white font-medium py-1.5 px-4 rounded-md transition cursor-pointer"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
