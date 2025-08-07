import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { getResponse } from "../../config/gemini.js";
import PromptInput from "../PromptInput/PromptInput.jsx";
import "./Main.css";

type MainProps = {
  currentPrompt: string | null;
  promptHistory: string[];
  setPromptHistory: any;
};

const Main: React.FC<MainProps> = ({ currentPrompt, promptHistory, setPromptHistory }) => {
  const [content, setContent] = useState<string>("");
  const [promptToDisplay, setPromptToDisplay] = useState<string>("");
  const [showContent, setShowContent] = useState<boolean>(false);

  /**
   * Generates content based on the currentPrompt (prop passed from App component)
   */
  useEffect(() => {
    if (currentPrompt) {
      generateContent(currentPrompt);
    }
  }, [currentPrompt]);

  async function generateContent(prompt: string) {
    setPromptToDisplay(prompt);
    setShowContent(true);
    const response = await getResponse(prompt);
    let contentString = "";
    for await (const chunk of response) {
      contentString += chunk.text;
      setContent(contentString);
    }
  }

  function handleContentGeneration(prompt: string): void {
    generateContent(prompt);
    updatePromptHistory(prompt);
  }

  function updatePromptHistory(prompt: string): void {
    setPromptHistory((prompts: string[]) => [...prompts, prompt]);
  }

  return (
    <div className="w-full p-5 px-7">
      <nav className="flex justify-between items-center pr-2">
        <p className="text-2xl text-[#585858]">Lumina</p>
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
      </nav>
      <div className="h-[calc(100vh-80px)] flex flex-col">
        <section className="grow flex justify-center items-center overflow-y-auto">
          {showContent ? (
            <div className="py-4 text-[#333] w-[800px] h-full overflow-scroll">
              <div className="flex justify-end">
                <span className="p-4 bg-[#444] text-white rounded-4xl rounded-br-sm">{promptToDisplay}</span>
              </div>
              <br />
              <div className="content">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="mx-auto text-5xl font-bold text-center text-[#c4c7c5]">
              <h3>
                Meet <span className="text-gradient-lumina">Lumina</span>,
              </h3>
              <h3>your personal AI assistant.</h3>
            </div>
          )}
        </section>
        <PromptInput handleContentGeneration={handleContentGeneration} promptHistory={promptHistory} />
      </div>
    </div>
  );
};

export default Main;
