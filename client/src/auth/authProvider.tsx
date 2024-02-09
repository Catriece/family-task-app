import React, { FC, useState, useEffect } from "react";
import AuthContext from "./authContext";
import { CurrentUser, User } from "../types";
import { useMutation } from "@tanstack/react-query";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored_user = JSON.parse(localStorage.getItem("user") || "null");
    if (stored_user) {
      setUser(stored_user);
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
