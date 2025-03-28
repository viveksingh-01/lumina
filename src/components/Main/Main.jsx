import React from "react";
import { assets } from "../../assets/assets.js";
import "./Main.css";

function Main() {
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
      <section className="h-120 flex justify-center items-center">
        <div className="mx-auto text-5xl font-bold text-center text-[#c4c7c5]">
          <h3>
            Meet <span className="lumina-text">Lumina</span>,
          </h3>
          <h3>your personal AI assistant.</h3>
        </div>
      </section>
      <section className="w-full flex justify-center mb-10">
        <div className="w-[720px] mx-auto p-5 bg-[#f0f4f9] text-lg rounded-full">
          <input
            type="text"
            className="w-full bg-transparent outline-0 border-none"
            placeholder="Enter a prompt here"
          />
        </div>
      </section>
    </div>
  );
}

export default Main;
