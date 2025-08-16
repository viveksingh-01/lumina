import { AxiosError } from "axios";
import { UserCircle2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/auth";
import { IErrorResponse } from "../../types/response";
import { IUserDetails } from "../../types/user-details";

const Navbar: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthorized, user, setUser } = useAuth();

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
      const res = await logout();
      setUser({} as IUserDetails);
      console.log(res);
    } catch (err) {
      const apiError = (err as AxiosError).response?.data;
      const { error } = apiError as IErrorResponse;
      console.error("Error:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center pr-2">
      <p className="text-2xl text-[#585858]">Lumina</p>
      {isAuthorized ? (
        <div className="flex gap-1.5 items-center">
          <p className="text-lg tracking-wide text-[#1b1c1d]">{firstName}</p>
          <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="relative inline-block">
            <UserCircle2 size={28} strokeWidth={1.25} />
          </div>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              onClick={handleLogout}
              className="absolute w-36 top-15 right-9 z-10 px-4 py-2 text-center text-sm tracking-wide text-gray-700 hover:bg-gray-100 hover:cursor-pointer rounded-md bg-white shadow-lg ring-1 ring-[#1b1c1d] ring-opacity-5"
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
