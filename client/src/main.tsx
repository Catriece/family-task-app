import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import LoginPage from "./pages/login-page";
import DashboardPage from "./pages/dashboard";
import ResetPasswordPage from "./pages/reset-password";
import SettingsPage from "./pages/settings-page";
import axios from "axios";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
const token = localStorage.getItem("token");

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
        path: "/account/:id/settings/",
        element: <SettingsPage />,
        loader: async ({ params }) => {
          console.log(params);
          console.log(token);
          const data = await axios.get("http://localhost:2883/auth/user", {
            params,
            headers: { Authorization: "Bearer " + token },
          });
          return data;
        },
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
