import { useState } from "react";
import "./Sidebar.css";
import { assets } from "/src/assets/assets.js";

function Sidebar({ promptHistory, setCurrentPrompt }) {
  const [sidebarToggler, setSidebarToggler] = useState(false);

  function handleSidebarToggle() {
    setSidebarToggler((value) => !value);
  }

  return (
    <aside
      onMouseEnter={() => setSidebarToggler(true)}
      onMouseLeave={() => setSidebarToggler(false)}
      className={`sidebar ${sidebarToggler ? "expanded" : ""}`}
    >
      <div className="top">
        <button
          onClick={handleSidebarToggle}
          className="p-3 rounded-full hover:bg-[#e2e6eb] cursor-pointer"
        >
          <img src={assets.menu_icon} style={{ width: 20 }} alt="menu icon" />
        </button>
        {sidebarToggler && promptHistory.length > 0 && (
          <div className="my-5 flex flex-col">
            <div className="mt-5 ml-3 flex gap-2">
              <img
                src={assets.history_icon}
                style={{ width: 24 }}
                alt="message icon"
              />
              <p className="text-lg mb-2">Recent</p>
            </div>
            {promptHistory.map((prompt, index) => (
              <div
                key={index}
                onClick={() => setCurrentPrompt(prompt)}
                className="ml-1 min-w-3xs p-3 flex justify-start gap-1 rounded-2xl text-[#282828] hover:bg-[#e2e6eb] cursor-pointer"
              >
                <img
                  src={assets.message_icon}
                  style={{ width: 24 }}
                  alt="message icon"
                />
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
