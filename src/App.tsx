import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js";
import Auth from "./pages/Auth/Auth.js";
import Home from "./pages/Home/Home.js";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="auth" Component={Auth}>
        <Route path="create-account" Component={Signup} />;
        <Route path="log-in" Component={Login} />;
      </Route>
    </Routes>
  );
};

export default App;
