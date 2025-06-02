import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 1800);
    }
  }, [user, navigate]);

  return (
    <div className="bg-slate-300 max-w-screen min-h-screen text-black overflow-x-hidden">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[10px] z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Sign In Required</h2>
            <p className="text-gray-700">
              Please sign in to access the dashboard.
            </p>
          </div>
        </div>
      )}
      <div className="flex md:flex-1/2 lg:flex-2/3 gap-3 pt-5 px-5">
        <NavLink
          to="/mybots"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-black hover:text-blue-600 transition"
          }
        >
          <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">My Bots</h2>
            <p className="text-gray-600">Manage your existing WhatsApp bots.</p>
          </div>
        </NavLink>

        {/* <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p className="text-gray-600">View message stats and performance.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Integrations</h2>
          <p className="text-gray-600">
            Configure GPT, Twilio, and other tools.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
