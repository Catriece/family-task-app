import { FC, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Collapse,
  useDisclosure,
  Checkbox,
  useToast,
  HTMLChakraComponents,
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
  dueOn,
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

  const {
    openModal,
    closeModal,
    isOpen: handleModal,
    setEdits,
    edits,
  } = useModal();

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

  const deleteTask = async () => {
    const formData = {
      taskId: Number(index),
      userId: id,
    };

    await remove.mutateAsync(formData);
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
    console.log(formData.data);
    setEdits(formData.data[0]); // Double check how edits are set up in context
    handleModal ? closeModal() : openModal();
    console.log(edits, "edits");
  };

  const markCompleted = async () => {
    const setComplete = !boxChecked;
    setBoxChecked(setComplete);
    completedRef.current = setComplete;

    console.log(taskCount, "Task Count");
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
      borderColor={priority === 1 ? ERROR : SUCCESS}
      borderWidth=".1em"
      bg={priority === 1 ? ERROR : SUCCESS}
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

          <Flex alignItems={"center"}>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />} // Description must also be present
              onClick={onToggle}
            />
            <Text fontWeight={500}>{dueOn}</Text>
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
