import { AxiosError } from "axios";
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

type content = {
  text: string;
  role: "user" | "lumina";
};

const Main: React.FC<MainProps> = ({ currentPrompt, promptHistory, setPromptHistory }) => {
  const [content, setContent] = useState<content[]>([]);
  const [showContent, setShowContent] = useState<boolean>(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetchAndStoreUserDetails();
    }
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
    setContent((prev) => [...prev, { text: prompt, role: "user" }]);
    setShowContent(true);
    const payload = {
      message: prompt,
      userId: user.email,
    };
    try {
      const response = await getResponse(payload);
      setContent((prev) => [...prev, { text: response, role: "lumina" }]);
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.log(error);
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
    <div className="w-full p-3 md-py-5 md:px-7">
      <Navbar />
      <div className="px-2 h-[calc(100vh-80px)] flex flex-col">
        <section className="grow flex justify-center items-center overflow-y-auto">
          {showContent ? (
            <div className="py-4 text-[#333] w-[800px] h-full overflow-scroll">
              {content.map((item) =>
                item.role === "user" ? (
                  <div className="flex justify-end mb-4">
                    <span className="px-4 py-3 bg-[#444] text-white rounded-4xl rounded-br-sm">{item.text}</span>
                  </div>
                ) : (
                  <div className="content mb-8 p-4 bg-gray-50 rounded-lg">
                    <ReactMarkdown>{item.text}</ReactMarkdown>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="mx-auto text-3xl md:text-5xl font-bold text-center text-[#c4c7c5]">
              <h3>
                Meet <span className="text-gradient-lumina-animated">Lumina</span>,
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
