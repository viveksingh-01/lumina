import { User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthorized, user } = useAuth();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current?.contains(target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);

  let firstName: string = "";
  if (user?.name) {
    firstName = user.name.split(" ")[0];
  }

  const handleLogout = async () => {
    setIsDropdownOpen(!isDropdownOpen);
    try {
      localStorage.removeItem("auth_token");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <nav className="px-2 lg:py-2 lg:px-4 flex justify-between items-center">
      <p className="text-xl lg:text-2xl text-[#585858]">Lumina</p>
      {isAuthorized ? (
        <div>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="lg:mr-4 relative flex gap-1 items-center hover:cursor-pointer"
          >
            <User size={18} strokeWidth={2} />
            <p className="text-lg tracking-wide text-[#1b1c1d]">{firstName}</p>
          </div>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              onClick={handleLogout}
              className="absolute w-32 top-12 right-4 lg:top-16 lg:right-8 z-10 px-4 py-2 text-center text-sm tracking-wide text-gray-700 hover:bg-gray-100 rounded-md bg-white shadow-lg ring-1 ring-[#1b1c1d] ring-opacity-5"
            >
              Sign out
            </div>
          )}
        </div>
      ) : (
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
      )}
    </nav>
  );
};

export default Navbar;
