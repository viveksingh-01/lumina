import { createContext, useState } from "react";
import { IUserDetails } from "../types/user-details";

type IUserContextProps = {
  user: IUserDetails;
  setUser: React.Dispatch<React.SetStateAction<IUserDetails>>;
};

export const UserContext = createContext<IUserContextProps>({
  user: {} as IUserDetails,
  setUser: () => {},
});

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState({} as IUserDetails);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
