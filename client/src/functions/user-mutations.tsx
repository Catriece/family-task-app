import axios from "axios";
import {
  ChangePassword,
  LoginUser,
  UpdateUserInformation,
  DeleteUser,
} from "../types";

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

export const updateUserFunction = (requestBody: UpdateUserInformation) => {
  const { token } = requestBody;
  const data = axios.post(
    `http://localhost:2883/auth/update-user-personal-info`,
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("DATA", data)
  return data
};

export const deleteUserFunction = (requestBody: DeleteUser) => {
  const { token } = requestBody;
  return axios.delete("http://localhost:2883/auth/delete-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: requestBody,
  });
};
