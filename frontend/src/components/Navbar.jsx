import React from "react";
// import { FaCode, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          {/* Logo / Title */}
          <div className="flex items-center gap-2 text-indigo-600">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">
              Code Snippets
            </h1>
          </div>

          {/* Logout Button */}
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-800 text-white text-sm font-medium px-4 py-2 rounded-md transition-all">
            {/* <FaSignOutAlt /> */}
            Logout
          </button>
        </div>
      </header>
    </>
  );
}

export default Navbar;
