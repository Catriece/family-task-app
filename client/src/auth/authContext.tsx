import { createContext } from "react";
import { CurrentUser } from "../types";

const AuthContext = createContext<CurrentUser>({
  isAuthenticated: false,
  user: null,
  login: () => Promise.resolve(),
  logout: () => {},
});

export default AuthContext;
