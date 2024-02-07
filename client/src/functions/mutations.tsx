import axios from "axios";
import { LoginUser } from "../types";

export const loginFunction = (requestBody: LoginUser) => {
  const res = axios.post("http://localhost:2883/auth/login", requestBody); // Data sent from the client side to backend
  return res;
};
