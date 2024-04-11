// Change name of component
import { Flex } from "@chakra-ui/react";
import TaskComponent from "../tasks/task-component";
import { useLoaderData } from "react-router-dom";
import { descendingOrder } from "../../functions/compare-functions";
import ButtonComponent from "../buttons/my-button-component";
import { useModal } from "../../context/modal/modal-context";

const TaskByWeekCalendarComponent = () => {
  let data: any = useLoaderData();
  const tasks: any = data.get("tasks").data.sort(descendingOrder);

  const { openModal } = useModal();

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
          width="50%"
        />
      )}
    </Flex>
  );
};

export default TaskByWeekCalendarComponent;
