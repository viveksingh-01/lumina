import React, { useState } from "react";
import Main from "./components/Main/Main.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";

const App = () => {
  const [promptHistory, setPromptHistory] = useState([]);
  return (
    <main className="flex flex-nowrap">
      <Sidebar prompts={promptHistory} />
      <Main setPromptHistory={setPromptHistory} />
    </main>
  );
};

export default App;
