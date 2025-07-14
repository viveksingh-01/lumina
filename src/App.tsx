import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup/Signup.js";
import Auth from "./pages/Auth/Auth.js";
import Home from "./pages/Home/Home.js";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="auth" Component={Auth}>
        <Route path="create-account" Component={Signup} />;
      </Route>
    </Routes>
  );
};

export default App;
