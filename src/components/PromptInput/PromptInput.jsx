import React, { useState } from "react";
import { assets } from "../../assets/assets";

export default function PromptInput({ handleContentGeneration }) {
  const [prompt, setPrompt] = useState("");

  function handleInputSubmission() {
    handleContentGeneration(prompt);
    resetInput();
  }

  function handleKeyDown(e) {
    if (e.keyCode == 13) {
      handleInputSubmission();
    }
  }

  function resetInput() {
    setPrompt("");
  }

  return (
    <section className="w-full flex justify-center">
      <div className="w-[800px] p-5 flex justify-between gap-4 bg-[#f0f4f9] text-lg rounded-full">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-0 border-none"
          placeholder="Enter a prompt here"
        />
        <span onClick={handleInputSubmission} className="cursor-pointer">
          <img
            src={assets.send_icon}
            className="opacity-65 hover:opacity-100"
            width="32px"
            alt="send icon"
          />
        </span>
      </div>
    </section>
  );
}
