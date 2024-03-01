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
import TodoComponent from "./components/todos/todo-component.tsx";

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
          const id = localStorage.getItem("userId");
          const data = await axios.get(
            `http://localhost:2883/auth/user?id=${id}`,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
          console.log(data);
          return data;
        },
        children: [{ element: <TodoComponent /> }],
      },
      {
        path: "/reset-password/:token/:id",
        element: <ResetPasswordPage />,
      },
      {
        path: "/account/settings/:id",
        element: <SettingsPage />,
        loader: async (params) => {
          const token = localStorage.getItem("token");
          const id = localStorage.getItem("userId");

          const data = await axios.get(`http://localhost:2883/auth/user`, {
            params: { id },
            headers: { Authorization: "Bearer " + token },
          });

          return data;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
