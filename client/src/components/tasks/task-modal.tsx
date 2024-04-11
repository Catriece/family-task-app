// Need to create modal context
import React, { FC, useEffect, useState } from "react";
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
  useToast,
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

  const [priority, setPriority] = useState<number>(0);
  const {
    closeModal,
    isOpen,
    edits,
    setEdits,
    addDescription,
    setAddDescription,
  } = useModal();

  useEffect(() => {
    if (isOpen === false) {
      setFormData({
        title: "",
        description: "",
      });
      setPriority(0);
    }
  }, [isOpen]);

  const { id } = useParams();
  const revalidator = useRevalidator();
  const toast = useToast();

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
    if (edits.title)
      setEdits({ ...edits, [e.target.name]: Number(e.target.value) });
    else setPriority(Number(e.target.value));
  };

  const handleSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = {
      ...formData,
      userId: id,
      priority: Number(priority),
      completed: false,
    };

    await createTask.mutateAsync(data);
    revalidator.revalidate();

    setFormData({
      title: "",
      description: "",
    });
    setPriority(0);
  };

  const handleEditTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const editedData = {
      ...edits,
      priority: Number(edits.priority),
    };
    await updateTask.mutateAsync(editedData);
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
      revalidator.revalidate();
      toast({
        title: "Task Updated",
        description: "Your task was successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      console.error("Error editing task");
      toast({
        title: "Task Update Unsuccessful",
        description: "There was an error updating your task.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
              Title (required):
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
          {addDescription === false && edits.description === "" ? (
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
          ) : null}

          {addDescription || edits.description !== "" ? (
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
        </ModalBody>

        <ModalFooter>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Select
              fontSize={"sm"}
              placeholder="Select Priority"
              name="priority"
              w={"45%"}
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
