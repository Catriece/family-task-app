import axios from "axios";

interface NewTodo {
  id: string;
  token: string;
  priority: string | null;
  dueDate: Date;
  title: string;
  description: string | null;
  completed: boolean;
}

export const createTodo = (requestBody: NewTodo) => {
  const { token } = requestBody;
  return axios.post("http://localhost:2883/todo/create-new-todo", requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
