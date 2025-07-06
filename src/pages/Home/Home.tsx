import { useState } from "react";
import Main from "../../components/Main/Main";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home: React.FC = () => {
  // Keeps the log of all the prompts
  const [promptHistory, setPromptHistory] = useState([]);
  // Stores the current-prompt value which will be used to populate the prompt's input value
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  return (
    <main className="flex flex-nowrap">
      <Sidebar promptHistory={promptHistory} setCurrentPrompt={setCurrentPrompt} />
      <Main currentPrompt={currentPrompt} promptHistory={promptHistory} setPromptHistory={setPromptHistory} />
    </main>
  );
};

export default Home;
