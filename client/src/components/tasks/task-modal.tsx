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
  Box,
  Select,
  Flex,
  Button,
  Switch,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useModal } from "../../context/modal/modal-context";
import {
  createTaskFunction,
  updateTaskFunction,
} from "../../functions/task-mutations";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRevalidator } from "react-router-dom";

//import dayjs from "dayjs";
import { DARKESTVARIATION, DARKVARIATION, MEDIUMVARIATION } from "../styles";
import ButtonComponent from "../buttons/my-button-component";

// const dayNames = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
// const monthAbbr = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sept",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

interface TaskModalForm {
  editTitle?: string;
  editDescription?: string;
  editDate?: string;
  editPriority?: number;
}

const TaskModalForm = () => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
  });
  // const [dueOn, setDueOn] = useState<string>("");
  //const [formatDate, setFormatDate] = useState<string>("");
  const [priority, setPriority] = useState<number>(0);
  const {
    closeModal,
    isOpen,
    edits,
    setEdits,
    addDescription,
    setAddDescription,
  } = useModal();

  const { id } = useParams();
  const revalidator = useRevalidator();

  // Change Title Between Edit and Creating Todo
  const titleOfModal = edits.title ? "Edit" : "Create";

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (edits.title) setEdits({ ...edits, [e.target.name]: e.target.value });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextAreaField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (edits.title) setEdits({ ...edits, [e.target.name]: e.target.value });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (edits.title) setEdits({ ...edits, [e.target.name]: e.target.value });
    else setPriority(Number(e.target.value));
    console.log("Target Name: ", e.target.name);
    console.log("Target Value: ", typeof e.target.value);
  };

  // const handleDueOn = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const date = e.target.value;
  //   const dotw = dayjs(e.target.value).get("day");
  //   setDueOn(date);
  //   // Is this called destructuring?
  //   const [year, month, day] = date.split("-");
  //   const index = Number(month) - 1;
  //   const formattedDate = `${dayNames[dotw]}, ${monthAbbr[index]} ${day}`;
  //   console.log(formattedDate);
  //   setFormatDate(formattedDate);
  // };

  const handleSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("Button clicked");
    const data = {
      ...formData,
      userId: id,
      priority,
      // dueOn: formatDate,
      completed: false,
    };
    console.log("form data", data);

    await createTask.mutateAsync(data);
    revalidator.revalidate();

    setFormData({
      title: "",
      description: "",
    });
    setPriority(0);
    // setDueOn("");
    //setFormatDate("");
  };

  const handleEditTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await updateTask.mutateAsync(edits);
    revalidator.revalidate();
  };

  // Mutations

  // Place in a separate file?
  const createTask = useMutation({
    mutationFn: createTaskFunction,
    onSuccess: () => {
      closeModal();
    },
    onError: () => {
      console.error("Error creating new task");
    },
  });

  const updateTask = useMutation({
    mutationFn: updateTaskFunction,
    onSuccess: () => {
      closeModal();
      // add toast
    },
    onError: () => {
      console.error("Error editing task");
    },
  });

  return (
    <Modal size={"sm"} isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader
          color={DARKESTVARIATION}
          fontSize={"2xl"}
        >{`${titleOfModal} New Task`}</ModalHeader>

        <ModalCloseButton />

        <ModalBody pb={0}>
          <FormControl>
            <FormLabel mb={"4pt"} fontSize={"xl"} color={DARKESTVARIATION}>
              Title*:
            </FormLabel>

            <Input
              name="title"
              isRequired
              value={edits.title ? edits.title : formData.title}
              onChange={handleInputField}
              color={DARKVARIATION}
              borderColor={MEDIUMVARIATION}
            />
          </FormControl>
          {addDescription === false && (
            <Button
              borderRadius={20}
              mt={2}
              pl={1}
              onClick={() => setAddDescription(true)}
              variant="tertiary"
              fontSize={"sm"}
            >
              Add description
            </Button>
          )}

          {addDescription ? (
            <>
              <FormLabel
                mt={"20pt"}
                mb={"4pt"}
                fontSize={"xl"}
                color={DARKESTVARIATION}
              >
                Description:
              </FormLabel>

              <Textarea
                name="description"
                value={
                  edits.description ? edits.description : formData.description
                }
                onChange={handleTextAreaField}
                color={DARKVARIATION}
                borderColor={MEDIUMVARIATION}
              />
            </>
          ) : null}

          {/* <Flex mt={2} flexDirection={"row-reverse"} align={"center"}>
            <Input
              name="dateTime"
              color={DARKVARIATION}
              isRequired
              w={"50%"}
              placeholder="Select Date and Time"
              size="sm"
              type="date"
              value={edits.dueOn ? edits.dueOn : dueOn}
              onChange={handleDueOn}
              borderColor={MEDIUMVARIATION}
            />
            <Text fontSize={"xl"} color={DARKESTVARIATION} mr={3}>
              Due:{" "}
            </Text>
          </Flex> */}
        </ModalBody>

        <ModalFooter>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Select
              fontSize={"sm"}
              placeholder="Select Priority"
              name="priority"
              w={"45%"}
              defaultValue={0}
              value={edits.priority ? edits.priority : priority}
              onChange={handlePriority}
              color={DARKVARIATION}
              borderColor={MEDIUMVARIATION}
            >
              <option value={2}>High Priority</option>
              <option value={1}>Low Priority</option>
            </Select>

            <Box w={"50%"}>
              {edits.title ? (
                <ButtonComponent
                  variant={"primary"}
                  func={handleEditTask}
                  buttonName={"Edit"}
                />
              ) : (
                <ButtonComponent
                  variant={"primary"}
                  func={handleSubmitForm}
                  buttonName={"Submit"}
                />
              )}
            </Box>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModalForm;
