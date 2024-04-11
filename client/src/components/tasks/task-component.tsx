import { FC, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  Flex,
  Box,
  Heading,
  Text,
  Collapse,
  useDisclosure,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { TfiTrash } from "react-icons/tfi";
import { BiEditAlt } from "react-icons/bi";
import { useParams, useRevalidator } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteTaskFunction } from "../../functions/task-mutations";
import { TaskData } from "../../types";
import { useModal } from "../../context/modal/modal-context";
import { ERROR, SUCCESS } from "../styles";
import axios from "axios";
import { useTask } from "../../context/tasks/task-context";

const TaskComponent: FC<TaskData> = ({
  title,
  description,
  priority,
  //dueOn,
  index,
  completed,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const revalidator = useRevalidator();
  const toast = useToast();
  const completedRef = useRef<boolean>(completed);
  const [boxChecked, setBoxChecked] = useState<boolean>(completedRef.current);

  let { taskCount, setTaskCount } = useTask();

  const { openModal, closeModal, isOpen: handleModal, setEdits } = useModal();

  const remove = useMutation({
    mutationFn: deleteTaskFunction,
    onSuccess: () => {
      toast({
        title: "Task deleted",
        description: "Your task was successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      revalidator.revalidate();
    },
    onError: () => {
      console.error("Task unsuccessfully deleted.");
      toast({
        title: "Failed Task Delete.",
        description: "We were unable to delete your task for you.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const deleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const formData = {
      taskId: Number(index),
      userId: id,
    };

    if (completed) {
      setTaskCount(taskCount - 1);
    }
    await remove.mutateAsync(formData);
    onToggle();
  };

  const editTask = async () => {
    // fetch task to edit
    const formData = await axios.get("http://localhost:2883/tasks/get-task", {
      params: { index },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // stores info from edits into state
    setEdits(formData.data[0]); // Double check how edits are set up in context
    handleModal ? closeModal() : openModal();
  };

  const markCompleted = async () => {
    const setComplete = !boxChecked;
    setBoxChecked(setComplete);
    completedRef.current = setComplete;

    setTaskCount(taskCount + (setComplete ? 1 : -1));

    const markCompleted = await axios.put(
      "http://localhost:2883/tasks/mark-completed",
      {
        taskId: index,
        completed: setComplete,
      }
    );

    console.log("Completed", markCompleted);
  };

  return (
    <Card
      w="90%"
      mb={3}
      key={index}
      borderColor={
        Number(priority) === 1 ? SUCCESS : Number(priority) === 2 ? ERROR : ""
      }
      borderWidth=".1em"
      bg={
        Number(priority) === 1 ? SUCCESS : Number(priority) === 2 ? ERROR : ""
      }
    >
      <CardHeader p={2} pt={3} pb={0}>
        <Flex flexDirection={"column"}>
          <Flex justifyContent={"space-between"}>
            <Heading size="md" pl={3}>
              {title}
            </Heading>
            <Box>
              <Checkbox
                variant={"square"}
                isChecked={completedRef.current}
                onChange={markCompleted}
              />
            </Box>
          </Flex>

          <Flex
            alignItems={"center"}
            mt={2}
            mb={3}
            ml={3}
            as="button"
            onClick={onToggle}
          >
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            <Text fontWeight={500} fontSize={"sm"} ml={2}>
              {isOpen ? "Hide Description" : "See Description"}
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
      <Collapse in={isOpen} animateOpacity>
        <Flex alignItems={"center"}>
          <Box w={"80%"}>
            <Text
              alignSelf={"center"}
              pb={4}
              pl={5}
              fontWeight={400}
              fontSize={"sm"}
            >
              {description
                ? description
                : "Hey! Did you forget to add a description?"}
            </Text>
          </Box>
          <Flex justifyContent={"space-around"} w={"20%"}>
            <Box as="button" onClick={editTask}>
              <BiEditAlt size="20px" />
            </Box>
            <Box as="button" onClick={deleteTask}>
              <TfiTrash size="20px" />
            </Box>
          </Flex>
        </Flex>
      </Collapse>
    </Card>
  );
};

export default TaskComponent;
