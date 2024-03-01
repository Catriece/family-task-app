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

const TodoForm = ({}) => {
  const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    description: "",
  });
  const [dateTime, setDateTime] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const { closeModal, isOpen } = useModal();

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextAreaField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = { ...formData, priority, dateTime };
    console.log("Form Data to be sent to server", data);
  };

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
              w={"75%"}
              placeholder="Select Date and Time"
              size="sm"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
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
              <option value="High Priority">High Priority</option>
              <option value="Low Priority">Low Priority</option>
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

export default TodoForm;
