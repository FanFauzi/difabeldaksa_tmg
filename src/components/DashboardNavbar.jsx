"use client";

import { logout } from "@/utils/auth";
import Navbar from "./Navbar";

export default function DashboardNavbar({ role }) {
  // Ambil info user dari localStorage
  let user = null;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  return (
    <>
      {/* <Navbar /> */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-lg">
          {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </div>

        <div className="flex items-center space-x-4">
          {user && <span>Hai, {user.name}</span>}
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
