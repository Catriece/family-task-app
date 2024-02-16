import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import * as type from "../types";

// CONSTANTS
const USER_QUERY_KEY = ["user"];

// ACTIONS
const newUser = async (): Promise<type.CreateUser> => {
  const { data } = await axios.post("http://localhost:2883/user");

  return data;
};

// HOOKS

export const createUser = () => {
  useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: newUser,
  });
};
