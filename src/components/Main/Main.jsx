import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { assets } from "../../assets/assets.js";
import { getResponse } from "../../config/gemini.js";
import "./Main.css";

function Main() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [promptToDisplay, setPromptToDisplay] = useState("");

  const generateContent = async () => {
    const response = await getResponse(prompt);
    setContent(response);
    setPromptToDisplay(prompt);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      generateContent(prompt);
    }
  };

  return (
    <div className="w-full p-5 px-7">
      <nav className="flex justify-between">
        <p className="text-2xl text-[#585858]">Lumina</p>
        <img
          src={assets.user_icon}
          width="40px"
          className="rounded-full"
          alt="user icon"
        />
      </nav>
      <section className="my-7 h-[calc(100vh-240px)] flex justify-center items-center">
        {content.length > 0 ? (
          <div className="py-4 text-[#333] w-[800px] h-full overflow-scroll">
            <div className="flex justify-end">
              <span className="p-4 bg-[#444] text-white rounded-4xl rounded-br-sm">
                {promptToDisplay}
              </span>
            </div>
            <br />
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <div className="mx-auto text-5xl font-bold text-center text-[#c4c7c5]">
            <h3>
              Meet <span className="lumina-text">Lumina</span>,
            </h3>
            <h3>your personal AI assistant.</h3>
          </div>
        )}
      </section>
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
          <span onClick={generateContent} className="cursor-pointer">
            <img
              src={assets.send_icon}
              className="opacity-65 hover:opacity-100"
              width="32px"
              alt="send icon"
            />
          </span>
        </div>
      </section>
    </div>
  );
}

export default Main;
