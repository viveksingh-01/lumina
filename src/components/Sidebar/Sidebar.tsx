import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";

type SidebarProps = {
  promptHistory: string[];
  setCurrentPrompt: (prompt: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ promptHistory, setCurrentPrompt }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpansionSustained, setIsExpansionSustained] = useState(false);
  const { isAuthorized } = useAuth();

  function handleToggleOnClick(): void {
    if (!isExpansionSustained) {
      setIsExpanded(true);
      setIsExpansionSustained(true);
    } else {
      setIsExpanded(false);
      setIsExpansionSustained(false);
    }
  }

  function handleToggleOnHover(value: boolean): void {
    // Expand or collapse sidebar on hover, only when it's in collapsed state
    if (!isExpansionSustained) {
      setIsExpanded(value);
    }
  }

  return (
    <aside
      onMouseEnter={() => handleToggleOnHover(true)}
      onMouseLeave={() => handleToggleOnHover(false)}
      className={`hidden lg:inline-flex sidebar ${isExpanded ? "expanded" : ""}`}
    >
      <div className="top">
        <button onClick={handleToggleOnClick} className="p-3 rounded-full hover:bg-[#e2e6eb] cursor-pointer">
          <img src={assets.menu_icon} style={{ width: 20 }} alt="menu icon" />
        </button>
        {isExpanded &&
          (isAuthorized ? (
            promptHistory.length > 0 && (
              <div className="my-5 flex flex-col">
                <div className="mt-5 ml-3 flex gap-2">
                  <img src={assets.history_icon} style={{ width: 24 }} alt="message icon" />
                  <p className="text-lg mb-2">Recent</p>
                </div>
                {promptHistory.map((prompt, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentPrompt(prompt)}
                    className="ml-1 min-w-3xs p-3 flex justify-start gap-1 rounded-2xl text-[#282828] hover:bg-[#e2e6eb] cursor-pointer"
                  >
                    <img src={assets.message_icon} style={{ width: 24 }} alt="message icon" />
                    <p>{prompt}</p>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="mt-12 px-3 py-5 bg-[#c4c7c56b] text-md rounded-3xl">
              <p className="mb-6 px-4 text-gray-900">Log in to see your recent queries here.</p>
              <Link to="/auth/log-in">
                <span className="py-3 px-4 rounded-full text-sky-700 hover:bg-gray-300 transition-colors hover:cursor-pointer">
                  Log in
                </span>
              </Link>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;
