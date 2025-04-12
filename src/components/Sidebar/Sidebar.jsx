import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "/src/assets/assets.js";

function Sidebar({ promptHistory, setCurrentPrompt }) {
  const [sidebarToggler, setSidebarToggler] = useState(true);

  function handleSidebarToggle() {
    setSidebarToggler((value) => !value);
  }

  return (
    <aside className="p-4 max-w-[320px] min-h-screen inline-flex flex-col justify-between bg-[#f0f4f9]">
      <div className="top">
        <img
          onClick={handleSidebarToggle}
          src={assets.menu_icon}
          className="cursor-pointer"
          alt="menu icon"
        />
        {sidebarToggler && promptHistory.length > 0 && (
          <div className="my-5 flex flex-col">
            <p className="mb-2">Recent</p>
            {promptHistory.map((prompt, index) => (
              <div
                key={index}
                onClick={() => setCurrentPrompt(prompt)}
                className="min-w-3xs p-3 flex justify-start gap-2 rounded-full text-[#282828] hover:bg-[#e2e6eb] cursor-pointer"
              >
                <img src={assets.message_icon} alt="message icon" />
                <p>{prompt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
