// Need to create modal context
import React, { useState } from "react";
import { TodoFormData } from "../../types";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Select,
  Flex,
} from "@chakra-ui/react";
import { useModal } from "../../context/modal-context";
import { createTodoFunction } from "../../functions/todo-mutations";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthAbbr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const TodoModalForm = ({}) => {
  const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    description: "",
  });
  const [dueOn, setDueOn] = useState<string>("");
  const [formatDate, setFormatDate] = useState<string>("");
  const [priority, setPriority] = useState<number>(0);
  const { closeModal, isOpen } = useModal();
  const { id } = useParams();

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTextAreaField = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePriority = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPriority(Number(e.target.value));

  const handleDueOn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const dotw = dayjs(e.target.value).get("day");
    setDueOn(date);
    // Is this called destructuring?
    const [year, month, day] = date.split("-");
    const index = Number(month) - 1;
    const formattedDate = `${dayNames[dotw]} (${monthAbbr[index]} ${day})`;
    console.log(formattedDate);
    setFormatDate(formattedDate);
  };

  const handleSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!priority) {
      setPriority(0);
    }

    const data = {
      ...formData,
      userId: id,
      token,
      priority,
      dueOn: formatDate,
      completed: false,
    };
    console.log(data);

    const todo = await createTodo.mutateAsync(data);
  };

  const createTodo = useMutation({
    mutationFn: createTodoFunction,
    onSuccess: () => {
      closeModal();
    },
    onError: () => {
      console.log("Error creating new task");
    },
  });

  return (
    <Modal size={"sm"} isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title:</FormLabel>
            <Input
              name="title"
              isRequired
              value={formData.title}
              onChange={handleInputField}
            />
          </FormControl>
          <FormLabel>Description:</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleTextAreaField}
          >
            {formData.description}
          </Textarea>
          <Flex mt={2} flexDirection={"row-reverse"} align={"center"}>
            <Input
              name="dateTime"
              isRequired
              w={"50%"}
              placeholder="Select Date and Time"
              size="sm"
              type="date"
              value={dueOn}
              onChange={handleDueOn}
            />
            <Text fontWeight={600} mr={3}>
              Due:{" "}
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Select
              fontSize={"sm"}
              placeholder="Select Priority"
              w={"45%"}
              value={priority}
              onChange={handlePriority}
            >
              <option value={1}>High Priority</option>
              <option value={0}>Low Priority</option>
            </Select>
            <Box>
              {/* <Button mr={2} onClick={(e) => isOpen === false}>Close</Button> */}
              <Button onClick={handleSubmitForm}>Submit</Button>
            </Box>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TodoModalForm;
