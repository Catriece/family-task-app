import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import LoginPage from "./pages/login/login-page.tsx";
import DashboardPage from "./pages/dashboard/dashboard.tsx";
import ResetPasswordPage from "./pages/settings/password/reset-password-form.tsx";
import SettingsPage from "./pages/settings/settings-page.tsx";
import axios from "axios";
import ErrorPage from "./pages/error/error-page.tsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TodoByWeekCalendarComponent from "./components/calendar/todo-calendar-component.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard/:id",
        element: <DashboardPage />,
        errorElement: <ErrorPage />,
        loader: async () => {
          const token = localStorage.getItem("token");
          const user = await axios.get("http://localhost:2883/auth/get-user", {
            headers: { Authorization: "Bearer " + token },
          });
          const todos = await axios.get(
            "http://localhost:2883/todos/get-todos",
            {
              headers: { Authorization: "Bearer " + token },
            }
          );

          const data = new Map([
            ["user", user],
            ["todos", todos],
          ]);
          return data;
        },
        children: [
          {
            element: <TodoByWeekCalendarComponent />,
          },
        ],
      },
      {
        path: "/reset-password/:token/:id",
        element: <ResetPasswordPage />,
      },
      {
        path: "/account/settings/:id",
        element: <SettingsPage />,
        loader: async () => {
          const token = localStorage.getItem("token");

          return await axios.get(`http://localhost:2883/auth/get-user`, {
            headers: { Authorization: "Bearer " + token },
          });
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
