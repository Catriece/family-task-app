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
  const token = localStorage.getItem("token");
  return axios.post("http://localhost:2883/auth/update-password", requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserFunction = async (
  requestBody: UpdateUserInformation
) => {
  const token = localStorage.getItem("token");
  if (requestBody.profilePhoto) {
    console.log(requestBody);
    const data = await axios.post(
      `http://localhost:2883/auth/upload-image`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } else {
    const data = await axios.post(
      `http://localhost:2883/auth/update-user-personal-info`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
};

export const deleteUserFunction = (requestBody: DeleteUser) => {
  const token = localStorage.getItem("token");
  return axios.delete("http://localhost:2883/auth/delete-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: requestBody,
  });
};
