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

const TodoModalForm = ({}) => {
  const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    description: "",
  });
  const [dueOn, setDueOn] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const { closeModal, isOpen } = useModal();
  const { id } = useParams();

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextAreaField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      ...formData,
      userId: id,
      token,
      priority,
      dueOn,
      completed: false,
    };
    const todo = await createTodo.mutateAsync(data);
    console.log("RETURNED TODO: ", todo);
  };

  const createTodo = useMutation({
    mutationFn: createTodoFunction,
    onSuccess: () => {
      console.log("New task created");
      closeModal();
    },
    onError: () => {
      console.log("Error creating new task");
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
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
              onChange={(e) => setDueOn(e.target.value)}
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
              onChange={(e) => setPriority(e.target.value)}
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
