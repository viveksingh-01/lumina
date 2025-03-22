import React from 'react';
import {assets} from "../../assets/assets.js";

function Main() {
  return (
      <div className="w-full p-4">
        <nav className="flex justify-between">
          <p className="text-2xl text-[#585858]">Lumina</p>
          <img src={assets.user_icon} width="40px" className="rounded-full" alt="user icon"/>
        </nav>
      </div>
  );
}

export default Main;