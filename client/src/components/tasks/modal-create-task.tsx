// Need to create modal context
import React, { FC, useState } from "react";
import { TaskFormData } from "../../types";
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
import { useModal } from "../../context/modal/modal-context";
import { createTaskFunction } from "../../functions/task-mutations";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRevalidator } from "react-router-dom";

import dayjs from "dayjs";
import {
  DARKESTVARIATION,
  DARKVARIATION,
  LIGHESTVARIATION,
  MEDIUMVARIATION,
  PRIMARYCOLOR,
  WHITE,
} from "../styles";

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

interface TaskModalForm {
  editTitle?: string;
  editDescription?: string;
  editDate?: string;
  editPriority?: string;
}

const TaskModalForm: FC<TaskModalForm> = ({
  editTitle,
  editDescription,
  editPriority,
  editDate,
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
  });
  const [dueOn, setDueOn] = useState<string>("");
  const [formatDate, setFormatDate] = useState<string>("");
  const [priority, setPriority] = useState<number>();

  const { closeModal, isOpen } = useModal();
  const { id } = useParams();
  const revalidator = useRevalidator();

  // Change Title Between Edit and Creating Todo
  const titleOfModal =
    editDate || editDescription || editPriority || editTitle
      ? "Edit"
      : "Create";

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
    const formattedDate = `${dayNames[dotw]}, ${monthAbbr[index]} ${day}`;
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

    await createTask.mutateAsync(data);
    revalidator.revalidate();

    setFormData({
      title: "",
      description: "",
    });
    setDueOn("");
    setFormatDate("");
    setPriority(0);
  };

  const createTask = useMutation({
    mutationFn: createTaskFunction,
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
        <ModalHeader
          color={DARKESTVARIATION}
        >{`${titleOfModal} New Task`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel color={DARKESTVARIATION}>Title:</FormLabel>
            <Input
              name="title"
              isRequired
              value={editTitle ? editTitle : formData.title}
              onChange={handleInputField}
              color={DARKVARIATION}
              borderColor={MEDIUMVARIATION}
            />
          </FormControl>
          <FormLabel color={DARKESTVARIATION}>Description:</FormLabel>
          <Textarea
            name="description"
            value={editDescription ? editDescription : formData.description}
            onChange={handleTextAreaField}
            color={DARKVARIATION}
            borderColor={MEDIUMVARIATION}
          ></Textarea>
          <Flex mt={2} flexDirection={"row-reverse"} align={"center"}>
            <Input
              name="dateTime"
              color={DARKVARIATION}
              isRequired
              w={"50%"}
              placeholder="Select Date and Time"
              size="sm"
              type="date"
              value={editDate ? editDate : dueOn}
              onChange={handleDueOn}
              borderColor={MEDIUMVARIATION}
            />
            <Text color={DARKESTVARIATION} fontWeight={600} mr={3}>
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
              value={editPriority ? editPriority : priority}
              onChange={handlePriority}
              color={DARKVARIATION}
              borderColor={MEDIUMVARIATION}
            >
              <option value={1}>High Priority</option>
              <option value={0}>Low Priority</option>
            </Select>
            <Box w={"50%"}>
              <Button
                w={"100%"}
                bgColor={PRIMARYCOLOR}
                onClick={handleSubmitForm}
              >
                Submit
              </Button>
            </Box>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModalForm;
