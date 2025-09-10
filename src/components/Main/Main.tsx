import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../hooks/useAuth.js";
import { getUserDetails } from "../../services/auth.js";
import { getResponse } from "../../services/chat-service.js";
import { IErrorResponse, IUserDetailsResponse } from "../../types/response.js";
import LoginAlert from "../LoginAlert/LoginAlert.js";
import Navbar from "../Navbar/Navbar.js";
import PromptInput from "../PromptInput/PromptInput.jsx";
import Shimmer from "../Shimmer/Shimmer.js";
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
  const { user, setUser } = useAuth();
  const [content, setContent] = useState<content[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetchAndStoreUserDetails();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever content change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [content]);

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
    setContent((prev) => [...prev, { text: prompt, role: "user" }, { text: "", role: "lumina" }]);
    setShowContent(true);
    setIsLoading(true);
    const payload = {
      message: prompt,
      userId: user.email,
    };
    try {
      const response = await getResponse(payload);
      setContent((prev) => {
        const lastIndex = prev.length - 1;
        const newItems = [...prev];
        newItems[lastIndex] = {
          ...prev[lastIndex],
          text: response,
        };
        return newItems;
      });
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error?.status === 401) {
        handleOpenModal();
      } else {
        const apiError = error?.response?.data;
        let errorMessage = "Something went wrong.\n Please try again after some time.";
        if (apiError) {
          errorMessage = (apiError as IErrorResponse)?.error;
        }
        toast(errorMessage);
      }
    } finally {
      setIsLoading(false);
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
              {content.map((item, index) =>
                item.role === "user" ? (
                  <div className="flex justify-end mb-4">
                    <span className="px-4 py-3 bg-[#444] text-white rounded-4xl rounded-br-sm">{item.text}</span>
                  </div>
                ) : index === content.length - 1 && isLoading ? (
                  <>
                    <Shimmer />
                    <div ref={bottomRef} />
                  </>
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
      <LoginAlert isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Main;
