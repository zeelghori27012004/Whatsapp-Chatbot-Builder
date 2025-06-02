// layouts/RootLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function RootLayout() {
  return (
    <div className="flex-col max-w-screen overflow-x-hidden">
      <Navbar />
      <Outlet /> {/* This renders the matched child route */}
    </div>
  );
}
