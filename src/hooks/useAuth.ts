import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useAuth = () => {
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error("useAuth must be used within the UserProvider");
  return userContext;
};
