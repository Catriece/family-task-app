// Change name of component
import { Box, Flex, Text } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";

import TaskComponent from "../tasks/task-component";
import { useLoaderData } from "react-router-dom";
import { descendingOrder } from "../../functions/compare-functions";
import { useTask } from "../../context/tasks/task-context";

const TaskByWeekCalendarComponent = () => {
  let data: any = useLoaderData();
  const tasks: any = data.get("tasks").data.sort(descendingOrder);

  const { taskCount } = useTask();

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      overflow={"scroll"}
    >
      <Box mb={4} w={"90%"}>
        <Text
          fontSize={"xl"}
          sx={{ textAlign: "left" }}
        >{`Tasks completed: ${taskCount}/${tasks.length}`}</Text>
        <Progress value={(taskCount / tasks.length) * 100} size={"lg"} />
      </Box>
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
                completed={task.completed}
              />
            );
          })
        : "Create new task"}
    </Flex>
  );
};

export default TaskByWeekCalendarComponent;
