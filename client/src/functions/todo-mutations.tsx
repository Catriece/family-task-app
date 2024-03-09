import axios from "axios";

interface NewTodo {
  userId: string | undefined;
  token?: string | null;
  priority?: number | null; // why are string values the interface but interger values stored?
  dueOn?: string | null;
  title?: string;
  description?: string | null;
  completed?: boolean;
}

interface DeleteTodo {
  userId: string | undefined;
  token: string | null;
  notesId: number | null;
}

export const createTodoFunction = async (requestBody: NewTodo) => {
  const { token } = requestBody;
  const data = await axios.post(
    "http://localhost:2883/todos/create-todos",
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteTodoFunction = async (requestBody: DeleteTodo) => {
  const { token } = requestBody;
  const data = await axios.delete("http://localhost:2883/todos/delete-todo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: requestBody,
  });

  return data;
};
