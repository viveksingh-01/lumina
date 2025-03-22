import React from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Main from "./components/Main/Main.jsx";

const App = () => {
  return (
      <main className="flex flex-nowrap">
        <Sidebar/>
        <Main/>
      </main>
  )
};

export default App;
