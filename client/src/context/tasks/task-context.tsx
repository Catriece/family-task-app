"use client";

import { createContext, useContext, useState, FC } from "react";

interface TaskContextInterface {
  taskCount: number;
  setTaskCount: (taskCount: number) => void;
}

type TaskProviderProps = {
  children: React.ReactNode;
};

const TaskContext = createContext<TaskContextInterface | null>(null);

export const TaskContextProvider = ({ children }: TaskProviderProps) => {
  const [taskCount, setTaskCount] = useState<number>(0); // Task state

  const taskProps = {
    taskCount,
    setTaskCount,
  };

  return (
    <TaskContext.Provider value={taskProps}>{children}</TaskContext.Provider>
  );
};

export function useTask(): TaskContextInterface {
  const context = useContext(TaskContext);
  if (context === null) {
    throw new Error("Task Count Error");
  }
  return context;
}
