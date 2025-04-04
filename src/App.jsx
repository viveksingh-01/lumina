import React, { useState } from "react";
import Main from "./components/Main/Main.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";

const App = () => {
  // Keeps the log of all the prompts
  const [promptHistory, setPromptHistory] = useState([]);
  // Stores the current-prompt value which will be used to populate the prompt's input value
  const [currentPrompt, setCurrentPrompt] = useState(null);
  return (
    <main className="flex flex-nowrap">
      <Sidebar
        promptHistory={promptHistory}
        setCurrentPrompt={setCurrentPrompt}
      />
      <Main currentPrompt={currentPrompt} setPromptHistory={setPromptHistory} />
    </main>
  );
};

export default App;
