import React, { FC } from "react";
import {
  Avatar,
  Flex,
  Text,
  Button,
  Box,
  useToast,
  FormLabel,
  Input,
  FormControl,
  Stack,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { AccountInfo } from "../../../types";
import mediaQueries from "../../../components/constants";
import { updateUserFunction } from "../../../functions/mutations";
import { useMutation } from "@tanstack/react-query";
import { EditIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";

const container = {
  padding: "20px 30px",
  maxWidth: "600px",
  marginTop: 5,
};

const UserAccountDetailsCard: FC<AccountInfo> = ({
  firstName,
  lastName,
  email,
  preferredName,
}) => {
  const { ISLARGERTHAN550, ISSMALLERTHAN300 } = mediaQueries();
  const [editPhotoText, setEditPhotoText] = useState<string>("Edit photo");

  // Name state
  const [currentFirstName, setFirstName] = useState<string>(firstName);
  const [currentLastName, setLastName] = useState<string>(lastName);
  const [editName, setEditName] = useState<boolean>(false); // State for button
  const [updateFirstName, setUpdateFirstName] = useState<string>(firstName);
  const [updateLastName, setUpdateLastName] = useState<string>(lastName);

  // Preferred Name state
  const [currentPreferredName, setPreferredName] =
    useState<string>(preferredName);
  const [editPreferredName, setEditPreferredName] = useState<boolean>(false);
  const [updatePreferredName, setUpdatePreferredName] =
    useState<string>(preferredName);

  // Email state
  const [currentEmail, setEmail] = useState<string>(email);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [updateEmail, setUpdateEmail] = useState<string>(email);

  const toast = useToast(); // Toast for success and error messages

  // CSS Media Queries
  const avatarSize = ISSMALLERTHAN300 ? "md" : "xl";
  const headingSize = ISSMALLERTHAN300 ? "lg" : ISLARGERTHAN550 ? "3xl" : "xl";
  const contentTextSize = ISSMALLERTHAN300 ? "sm" : ISLARGERTHAN550 ? "xl" : "";

  // Name to display for greeting message
  const name = preferredName ? currentPreferredName : currentFirstName;

  // Setting form data - name, preferred name and email edit
  let nameFormData: { [key: string]: string } = {};
  let preferredNameFormData: { [key: string]: string } = {};
  let emailFormData: { [key: string]: string } = {};

  const { id } = useParams();
  const token = localStorage.getItem("token");

  // Edit Icon Button Actions
  const handleNameEditButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditName(!editName);
  };

  const handlePreferredNameEditButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditPreferredName(!editPreferredName);
  };

  const handleEmailEditButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditEmail(!editEmail);
  };

  // Update Name Submission
  const handleUpdateName = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Form data for axios request
    if (updateFirstName !== currentFirstName)
      nameFormData["firstName"] = updateFirstName;
    if (updateLastName !== currentLastName)
      nameFormData["lastName"] = updateLastName;

    if (
      updateFirstName === currentFirstName &&
      updateLastName === currentLastName
    )
      throw new Error("Input fields haven't changed");

    const formData = { ...nameFormData, token, id };
    const response = await updateUser.mutateAsync(formData);

    if (response) setEditName(!editName);

    return response;
  };

  // Update Preferred Name Submission
  const handleUpdatePreferredName = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    // Form data for axios request
    if (updatePreferredName !== currentPreferredName)
      preferredNameFormData["preferredName"] = updatePreferredName;
    else throw new Error("Input fields haven't changed");

    const formData = { ...preferredNameFormData, token, id };
    const response = await updateUser.mutateAsync(formData);

    if (response) setEditPreferredName(!editPreferredName);

    return response;
  };

  // Update Email Submission
  const handleUpdateEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Form data for axios request
    if (updateEmail !== currentEmail) emailFormData["Email"] = updateEmail;
    else throw new Error("Input fields haven't changed");

    const formData = { ...emailFormData, token, id };
    const response = await updateUser.mutateAsync(formData);

    if (response) setEditEmail(!editEmail);

    return response;
  };

  const handleUploadPhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    editPhotoText === "Edit photo"
      ? setEditPhotoText("Save photo")
      : setEditPhotoText("Edit Photo");
    console.log("Upload new image");
  };

  const updateUser = useMutation({
    mutationFn: updateUserFunction,
    onSuccess: (response) => {
      console.log("Account update success");
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setPreferredName(response.data.preferredName);
      setEmail(response.data.email);

      console.log("RESPONSE ON SUCCESS", response);
      toast({
        title: "Update Account Information",
        description: "Your account was successfully updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: () => {
      console.log("Account update error");
      toast({
        title: "Update Account Information",
        description: "There was an error updating your account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  // Handles form inputs

  return (
    <Center>
      <Box sx={container}>
        <Text fontSize={"md"}>
          Hey {name}, You can manage all of your personal information here.
        </Text>

        <Text mt={5} fontSize={headingSize} fontWeight={600}>
          Profile Photo
        </Text>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Avatar size={avatarSize} />
          <Button
            variant="ghost"
            fontSize={"sm"}
            alignSelf={"flex-end"}
            onClick={handleUploadPhoto}
          >
            {editPhotoText}
          </Button>
        </Flex>

        <Flex
          h={"100%"}
          justifyContent={"space-between"}
          flexDirection={"column"}
        >
          <Box>
            <Text mt={2} fontSize={headingSize} fontWeight={650}>
              Personal Information
            </Text>
            <Flex
              alignItems={"flex-start"}
              flexDirection={"column"}
              justifyContent={"space-around"}
              h={"100%"}
            >
              <Flex flexDirection={"column"} w={"100%"}>
                <Box w={"100%"}>
                  <Text fontSize={contentTextSize} fontWeight={600} pl={2}>
                    Name:{" "}
                  </Text>
                </Box>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w={"inherit"}
                >
                  {editName ? (
                    <Flex mt={2} flexDirection={"column"} w={"100%"}>
                      <Stack spacing={3} ml={4}>
                        <FormControl w={"100%"}>
                          <FormLabel mb={0}>First Name</FormLabel>
                          <Flex alignItems={"center"}>
                            <Input
                              name="firstName"
                              value={updateFirstName}
                              onChange={(e) =>
                                setUpdateFirstName(e.target.value)
                              }
                            />
                          </Flex>
                        </FormControl>
                        <FormControl w={"100%"}>
                          <FormLabel mb={0}>Last Name</FormLabel>
                          <Flex alignItems={"center"}>
                            <Input
                              name="lastName"
                              value={updateLastName}
                              onChange={(e) =>
                                setUpdateLastName(e.target.value)
                              }
                            />
                          </Flex>
                        </FormControl>
                        <Flex justifyContent={"flex-end"}>
                          <Button onClick={handleUpdateName} w={"25%"} mr={2}>
                            Update
                          </Button>
                          <Button w={"25%"} onClick={handleNameEditButton}>
                            Cancel
                          </Button>
                        </Flex>
                      </Stack>
                    </Flex>
                  ) : (
                    <>
                      <Text
                        fontSize={contentTextSize}
                        pl={5}
                      >{`${currentFirstName} ${currentLastName}`}</Text>
                      <IconButton
                        aria-label="Email-Edit-Button"
                        onClick={handleNameEditButton}
                        variant="ghost"
                        pl={5}
                      >
                        <EditIcon />
                      </IconButton>
                    </>
                  )}
                </Flex>
              </Flex>

              <Flex flexDirection={"column"} w={"100%"}>
                <Box w={"100%"}>
                  <Text fontSize={contentTextSize} fontWeight={600} pl={2}>
                    Preferred Name:{" "}
                  </Text>
                </Box>
                <Flex
                  w={"inherit"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  {editPreferredName ? (
                    <Flex mt={2} flexDirection={"column"} w={"100%"}>
                      <Stack spacing={3} ml={4}>
                        <FormControl w={"100%"}>
                          <Flex alignItems={"center"}>
                            <Input
                              name="preferredName"
                              value={updatePreferredName}
                              onChange={(e) =>
                                setUpdatePreferredName(e.target.value)
                              }
                            />
                          </Flex>
                        </FormControl>
                        <Flex justifyContent={"flex-end"}>
                          <Button
                            onClick={handleUpdatePreferredName}
                            w={"25%"}
                            mr={2}
                          >
                            Update
                          </Button>
                          <Button
                            w={"25%"}
                            onClick={handlePreferredNameEditButton}
                          >
                            Cancel
                          </Button>
                        </Flex>
                      </Stack>
                    </Flex>
                  ) : (
                    <>
                      <Text fontSize={contentTextSize} pl={5}>
                        {currentPreferredName}
                      </Text>
                      <IconButton
                        aria-label="Email-Edit-Button"
                        onClick={handlePreferredNameEditButton}
                        variant="ghost"
                        pl={5}
                      >
                        <EditIcon />
                      </IconButton>
                    </>
                  )}
                </Flex>
              </Flex>
              <Flex flexDirection={"column"} w={"100%"}>
                <Box w={"100%"}>
                  <Text fontSize={contentTextSize} fontWeight={600} pl={2}>
                    Email:{" "}
                  </Text>
                </Box>
                <Flex
                  w={"inherit"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  {editEmail ? (
                    <Flex mt={2} flexDirection={"column"} w={"100%"}>
                      <Stack spacing={3} ml={4}>
                        <FormControl w={"100%"}>
                          <Flex alignItems={"center"}>
                            <Input
                              name="email"
                              value={updateEmail}
                              onChange={(e) => setUpdateEmail(e.target.value)}
                            />
                          </Flex>
                        </FormControl>
                        <Flex justifyContent={"flex-end"}>
                          <Button onClick={handleUpdateEmail} w={"25%"} mr={2}>
                            Update
                          </Button>
                          <Button w={"25%"} onClick={handleEmailEditButton}>
                            Cancel
                          </Button>
                        </Flex>
                      </Stack>
                    </Flex>
                  ) : (
                    <>
                      <Text fontSize={contentTextSize} pl={5}>
                        {currentEmail}
                      </Text>
                      <IconButton
                        aria-label="Email-Edit-Button"
                        onClick={handleEmailEditButton}
                        variant="ghost"
                        pl={5}
                      >
                        <EditIcon />
                      </IconButton>
                    </>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};

export default UserAccountDetailsCard;
