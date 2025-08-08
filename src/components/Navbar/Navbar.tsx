import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center pr-2">
      <p className="text-2xl text-[#585858]">Lumina</p>
      <div>
        <Link to="/auth/log-in">
          <span className="py-2 px-4 rounded-full text-sm tracking-wide text-gray-50 bg-gray-900 hover:bg-gray-800 transition-colors">
            Log in
          </span>
        </Link>
        <Link to="/auth/create-account">
          <span className="ml-4 py-2 px-4 rounded-full text-sm tracking-wide bg-[#f0f4f9] hover:bg-gray-200 transition">
            Sign up for free
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
