import { useState } from "react";
import "./Sidebar.css";
import { assets } from "/src/assets/assets.js";

function Sidebar({ promptHistory, setCurrentPrompt }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpansionSustained, setIsExpansionSustained] = useState(false);

  function handleToggleOnClick() {
    if (!isExpansionSustained) {
      setIsExpanded(true);
      setIsExpansionSustained(true);
    } else {
      setIsExpanded(false);
      setIsExpansionSustained(false);
    }
  }

  function handleToggleOnHover(value) {
    // Expand or collapse sidebar on hover, only when it's in collapsed state
    if (!isExpansionSustained) {
      setIsExpanded(value);
    }
  }

  return (
    <aside
      onMouseEnter={() => handleToggleOnHover(true)}
      onMouseLeave={() => handleToggleOnHover(false)}
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
    >
      <div className="top">
        <button
          onClick={handleToggleOnClick}
          className="p-3 rounded-full hover:bg-[#e2e6eb] cursor-pointer"
        >
          <img src={assets.menu_icon} style={{ width: 20 }} alt="menu icon" />
        </button>
        {isExpanded && promptHistory.length > 0 && (
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
