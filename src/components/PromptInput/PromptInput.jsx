import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import useSpeechRecognition from "../../hooks/useSpeechRecognition.js";
import Footer from "../Footer/Footer.jsx";
import "./PromptInput.css";

let promptIndex = 0;

function PromptInput({ handleContentGeneration, promptHistory }) {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef(null);
  const { startListening, isListening, stopListening, transcript } =
    useSpeechRecognition();

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
  }, [transcript]);

  function handleInputSubmission() {
    stopListening();
    handleContentGeneration(prompt);
    resetInput();
  }

  function handleKeyDown(e) {
    if (e.keyCode == 13) {
      handleInputSubmission();
    } else if (e.keyCode == 38) {
      traversePrompts(-1); // negative value indicates previous input traversal
    } else if (e.keyCode == 40) {
      traversePrompts(1); // positive value indicates next input traversal
    }
  }

  function traversePrompts(changeInIndexValue) {
    if (promptHistory.length > 1) {
      promptIndex += changeInIndexValue;
      setPrompt(promptHistory[promptIndex]);
    }
  }

  function resetInput() {
    setPrompt("");
  }

  function handleVoiceInput() {
    startListening();
  }

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <div className="input-container w-[800px] p-5 flex justify-between gap-4 bg-[#f0f4f9] text-lg rounded-full">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-0 border-none"
          placeholder={isListening ? "Listening..." : "Ask Lumina"}
          ref={inputRef}
        />
        <div className="flex gap-4">
          <span onClick={handleVoiceInput} className="cursor-pointer">
            <img
              src={assets.mic_icon}
              className="opacity-65 hover:opacity-100"
              width="32px"
              alt="mic icon"
            />
          </span>
          <span onClick={handleInputSubmission} className="cursor-pointer">
            <img
              src={assets.send_icon}
              className="opacity-65 hover:opacity-100"
              width="32px"
              alt="send icon"
            />
          </span>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default PromptInput;
