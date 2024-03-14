import axios from "axios";

interface NewTask {
  userId: string | undefined;
  token?: string | null;
  priority?: number | null; // why are string values the interface but interger values stored?
  dueOn?: string | null;
  title?: string;
  description?: string | null;
  completed?: boolean;
}

interface DeleteTask {
  userId: string | undefined;
  token: string | null;
  taskId: number | null;
}

export const createTaskFunction = async (requestBody: NewTask) => {
  const { token } = requestBody;
  const data = await axios.post(
    "http://localhost:2883/tasks/create-tasks",
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteTaskFunction = async (requestBody: DeleteTask) => {
  const { token } = requestBody;
  const data = await axios.delete("http://localhost:2883/tasks/delete-task", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: requestBody,
  });

  return data;
};
