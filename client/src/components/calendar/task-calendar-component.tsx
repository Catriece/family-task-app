// Change name of component
import { Flex } from "@chakra-ui/react";
import TaskComponent from "../tasks/task-component";
import { useLoaderData } from "react-router-dom";
import { descendingOrder } from "../../functions/compare-functions";

const TaskByWeekCalendarComponent = () => {
  let data: any = useLoaderData();
  const tasks: any = data.get("tasks").data.sort(descendingOrder);

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
                //dueOn={task.dueOn}
                priority={task.priority}
                title={task.title}
                completed={task.completed}
              />
            );
          })
        : "Create new task"}
    </Flex>
  );
};

export default TaskByWeekCalendarComponent;
