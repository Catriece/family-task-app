import axios from "axios";
import { ChangePassword, LoginUser } from "../types";

export const loginFunction = (requestBody: LoginUser) => {
  const res = axios.post("http://localhost:2883/auth/login", requestBody); // Data sent from the client side to backend
  return res;
};

export const changePasswordFunction = (requestBody: ChangePassword) => {
  const { token } = requestBody;
  return axios.post("http://localhost:2883/auth/update-password", requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
