import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import useSpeechRecognition from "../../hooks/useSpeechRecognition.js";
import Footer from "../Footer/Footer.jsx";
import "./PromptInput.css";

type PromptInputProps = {
  handleContentGeneration: (prompt: string) => void;
  promptHistory: string[];
};

let promptIndex = 0;
const PromptInput: React.FC<PromptInputProps> = ({ handleContentGeneration, promptHistory }) => {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { startListening, isListening, stopListening, transcript, setTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (promptHistory.length > 0) {
      promptIndex = promptHistory.length;
    }
  }, [promptHistory]);

  useEffect(() => {
    setPrompt(transcript);
    inputRef.current?.focus();
  }, [transcript]);

  function handleInputSubmission(): void {
    stopListening();
    handleContentGeneration(prompt);
    resetInput();
  }

  function handleKeyDown(e: any): void {
    if (e.keyCode == 13) {
      handleInputSubmission();
    } else if (e.keyCode == 38) {
      traversePrompts(-1); // negative value indicates previous input traversal
    } else if (e.keyCode == 40) {
      traversePrompts(1); // positive value indicates next input traversal
    }
  }

  function traversePrompts(changeInIndexValue: number): void {
    if (promptHistory.length > 1) {
      promptIndex += changeInIndexValue;
      setPrompt(promptHistory[promptIndex]);
    }
  }

  function resetInput(): void {
    setPrompt("");
    setTranscript("");
  }

  function handleVoiceInput(): void {
    startListening();
  }

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <div className="input-container w-[800px] p-2 flex justify-between gap-4 bg-[#f0f4f9] text-lg rounded-full">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full ml-4 text-[#1b1c1d] bg-transparent outline-0 border-none"
          placeholder={isListening ? "Listening..." : "Ask Lumina"}
          ref={inputRef}
        />
        <div className="flex gap-4">
          {isListening ? (
            <button
              onClick={handleInputSubmission}
              className="p-3 rounded-full opacity-65 hover:opacity-100 hover:bg-[#e2e6eb] cursor-pointer"
            >
              <img src={assets.send_icon} width="32px" alt="send icon" />
            </button>
          ) : (
            <button
              onClick={handleVoiceInput}
              className="p-3 rounded-full opacity-65 hover:opacity-100 hover:bg-[#e2e6eb] cursor-pointer"
            >
              <img src={assets.mic_icon} width="32px" alt="mic icon" />
            </button>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PromptInput;
