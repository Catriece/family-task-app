import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import AuthProvider from "./auth/authProvider.tsx";
import LoginPage from "./pages/login-page";
import DashboardPage from "./pages/dashboard";
import ResetPasswordPage from "./pages/reset-password";
import SettingsPage from "./pages/settings-page";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
    children: [
      {
        path: "/dashboard/:id",
        element: <DashboardPage />,
      },
      {
        path: "/reset-password/:token/:id",
        element: <ResetPasswordPage />,
      },
      {
        path: "/account/settings/:id?",
        element: <SettingsPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
