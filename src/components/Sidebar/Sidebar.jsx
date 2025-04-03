import React, { useEffect } from "react";
import "./Sidebar.css";
import { assets } from "/src/assets/assets.js";

function Sidebar({ prompts }) {
  useEffect(() => {
    console.log(prompts);
  });
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
          {prompts.map((prompt) => (
            <div className="min-w-3xs p-3 flex justify-start gap-2 rounded-full text-[#282828] hover:bg-[#e2e6eb] cursor-pointer">
              <img src={assets.message_icon} alt="message icon" />
              <p>{prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
