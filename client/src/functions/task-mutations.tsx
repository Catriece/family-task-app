import axios from "axios";

interface Task {
  userId?: string | undefined;
  priority: number | undefined;
  //dueOn: string | null;
  title: string;
  description?: string | null;
  completed?: boolean;
}

interface DeleteTask {
  userId: string | undefined;
  taskId: number | null;
}

const token = localStorage.getItem("token");

export const getTaskFunction = async (index: number) => {
  const data = await axios.get("http://localhost:2883/tasks/get-task", {
    params: { index },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const createTaskFunction = async (requestBody: Task) => {
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
  const data = await axios.delete("http://localhost:2883/tasks/delete-task", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: requestBody,
  });

  return data;
};

export const updateTaskFunction = async (requestBody: Task) => {
  const data = await axios.put(
    "http://localhost:2883/tasks/update-task",
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("DATA", data);
  return data;
};
