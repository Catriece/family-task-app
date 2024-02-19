import React, { useState, useEffect } from "react";
import AuthContext from "./authContext";
import { CurrentUser, User } from "../types";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async ({
    userCredentials,
    token,
  }: {
    userCredentials: User;
    token: string;
  }) => {
    // LOGIN LOGIC
    setUser(userCredentials);
    localStorage.setItem("user", JSON.stringify(userCredentials));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    // LOGOUT LOGIC
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userPackage: CurrentUser = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={userPackage}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
