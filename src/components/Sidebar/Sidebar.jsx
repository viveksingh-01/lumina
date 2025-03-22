import React from "react";
import "./Sidebar.css";
import { assets } from "/src/assets/assets.js";

function Sidebar() {
  return (
    <aside className="p-4 min-h-screen inline-flex flex-col justify-between bg-[#f0f4f9]">
      <div className="top">
        <img
          src={assets.menu_icon}
          className="cursor-pointer"
          alt="menu icon"
        />
        <div className="my-5 flex flex-col">
          <p className="mb-2">Recent</p>
          <div className="min-w-3xs p-4 flex justify-start gap-3 rounded-full text-[#282828] hover:bg-[#e2e6eb] cursor-pointer">
            <img src={assets.message_icon} alt="message icon" />
            <p>React vs Angular?</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
