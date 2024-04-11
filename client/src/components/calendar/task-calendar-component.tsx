// Change name of component
import { Flex } from "@chakra-ui/react";
import TaskComponent from "../tasks/task-component";
import { useLoaderData } from "react-router-dom";
import { descendingOrder } from "../../functions/compare-functions";
import ButtonComponent from "../buttons/my-button-component";
import { useModal } from "../../context/modal/modal-context";
import mediaQueries from "../constants";

const TaskByWeekCalendarComponent = () => {
  let data: any = useLoaderData();
  const tasks: any = data.get("tasks").data.sort(descendingOrder);

  const { openModal } = useModal();
  const { ISLARGERTHAN750 } = mediaQueries();

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      overflow={"scroll"}
    >
      {tasks.length > 0 ? (
        tasks.map((task: any, index: number) => {
          return (
            <TaskComponent
              key={index}
              index={task.taskId}
              description={task.description}
              priority={task.priority}
              title={task.title}
              completed={task.completed}
            />
          );
        })
      ) : (
        <ButtonComponent
          variant="primary"
          func={openModal}
          buttonName="Add your first task"
          width={ISLARGERTHAN750 ? "50%" : "65%"}
        />
      )}
    </Flex>
  );
};

export default TaskByWeekCalendarComponent;
