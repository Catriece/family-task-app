import axios from "axios";

interface NewTodo {
  userId: string | undefined;
  token?: string | null;
  priority?: string | null;
  dueDate?: string | null;
  title?: string;
  description?: string | null;
  completed?: boolean;
}

export const createTodoFunction = async (requestBody: NewTodo) => {
  const { token } = requestBody;
  console.log("requestBody", requestBody);
  const data = await axios.post(
    "http://localhost:2883/todos/create-todos",
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("What's happening", data);
  return data;
};
