import { Center, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

import TaskComponent from "../tasks/task-component";
import { useLoaderData } from "react-router-dom";

const TaskByWeekCalendarComponent = () => {
  const today = dayjs().format("dddd, MMMM D, YYYY"); // current day
  const tomorrow = dayjs().add(1, "d").format("dddd, MMMM D, YYYY"); // current day

  let data: any = useLoaderData();
  const tasks = data.get("tasks").data;

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      overflow={"scroll"}
    >
      {tasks.length > 0
        ? tasks.map((task: any, index: number) => {
            return (
              <TaskComponent
                key={index}
                index={task.taskId}
                description={task.description}
                dueOn={task.dueOn}
                priority={task.priority}
                title={task.title}
              />
            );
          })
        : "Create new task"}
    </Flex>
  );
};

export default TaskByWeekCalendarComponent;
