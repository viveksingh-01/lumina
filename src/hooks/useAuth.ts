import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useAuth = () => {
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error("useAuth must be used within the UserProvider");
  const { user } = userContext;
  const auth = { ...userContext, isAuthorized: false };
  if (user?.email) {
    auth.isAuthorized = true;
  }
  return auth;
};
