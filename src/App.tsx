import { Toaster } from "react-hot-toast";
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
      <Toaster
        toastOptions={{
          // Base styles (applies to all toasts unless overridden)
          style: {
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "15px",
            letterSpacing: 0.25,
            color: "#1f2937", // Tailwind: text-gray-800
          },
          success: {
            style: {
              background: "#f0fdf4", // Tailwind: bg-green-50
              borderLeft: "4px solid #10b981", // Tailwind: border-green-500
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#d1fae5",
            },
          },
          error: {
            style: {
              background: "#fef2f2", // Tailwind: bg-red-50
              borderLeft: "4px solid #ef4444", // Tailwind: border-red-500
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fee2e2",
            },
          },
        }}
      />
    </UserProvider>
  );
};

export default App;
