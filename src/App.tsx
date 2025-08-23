import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.js";
import SignupMultistep from "./components/Signup/SignupMultistep.js";
import { UserProvider } from "./context/UserContext.js";
import Auth from "./pages/Auth/Auth.js";
import Home from "./pages/Home/Home.js";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="auth" Component={Auth}>
          <Route path="create-account" Component={SignupMultistep} />;
          <Route path="log-in" Component={Login} />;
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
