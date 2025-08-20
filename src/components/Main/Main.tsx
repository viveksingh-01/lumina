import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../hooks/useAuth.js";
import { getUserDetails } from "../../services/auth.js";
import { getResponse } from "../../services/chat-service.js";
import { IUserDetailsResponse } from "../../types/response.js";
import Navbar from "../Navbar/Navbar.js";
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
  const { user, setUser } = useAuth();

  useEffect(() => {
    fetchAndStoreUserDetails();
  }, []);

  /**
   * Generates content based on the currentPrompt (prop passed from App component)
   */
  useEffect(() => {
    if (currentPrompt) {
      generateContent(currentPrompt);
    }
  }, [currentPrompt]);

  async function fetchAndStoreUserDetails() {
    const res = await getUserDetails();
    const { data } = res as IUserDetailsResponse;
    setUser(data);
  }

  async function generateContent(prompt: string) {
    setPromptToDisplay(prompt);
    setShowContent(true);
    const payload = {
      message: prompt,
      userId: user.email,
    };
    const response = await getResponse(payload);
    setContent(response);
  }

  function handleContentGeneration(prompt: string): void {
    generateContent(prompt);
    updatePromptHistory(prompt);
  }

  function updatePromptHistory(prompt: string): void {
    setPromptHistory((prompts: string[]) => [...prompts, prompt]);
  }

  return (
    <div className="w-full p-3 md-py-5 md:px-7">
      <Navbar />
      <div className="px-2 h-[calc(100vh-128px)] md:h-[calc(100vh-80px)] flex flex-col">
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
            <div className="mx-auto text-3xl md:text-5xl font-bold text-center text-[#c4c7c5]">
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
