import React from "react";
import { assets } from "../../assets/assets.js";

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
      <section className="h-60 flex justify-center items-center">
        <div className="mx-auto text-5xl font-bold text-center text-[#666]">
          <h3>Meet Lumina,</h3>
          <h3>your personal AI assistant.</h3>
        </div>
      </section>
    </div>
  );
}

export default Main;
