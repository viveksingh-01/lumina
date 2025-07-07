import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.js";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
    </Routes>
  );
};

export default App;
