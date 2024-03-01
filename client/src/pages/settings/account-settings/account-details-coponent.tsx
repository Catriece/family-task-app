import { FC } from "react";
import {
  Avatar,
  Flex,
  Card,
  Text,
  Button,
  Box,
  useToast,
  FormLabel,
  Input,
  FormControl,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { useState } from "react";
import { AccountInfo, UpdateFirstName } from "../../../types";
import mediaQueries from "../../../components/constants";
import axios from "axios";
import { updateUserFunction } from "../../../functions/user-mutations";
import { useMutation } from "@tanstack/react-query";
import { EditIcon } from "@chakra-ui/icons";

const container = {
  background: "#e0e0e0",
  FlexShadow: "20px 20px 60px #bebebe -20px -20px 60px #ffffff",
  padding: "20px 30px",
};

const UserAccountDetailsCard: FC<AccountInfo> = ({
  firstName,
  lastName,
  email,
}) => {
  const { ISLARGERTHAN550, ISSMALLERTHAN300 } = mediaQueries();
  const [editPhotoText, setEditPhotoText] = useState<string>("Edit photo");
  const [buttonName, setButtonName] = useState<string>("Edit Information");
  const [formView, setFormView] = useState<boolean>(false);

  const toast = useToast();

  const avatarSize = ISSMALLERTHAN300 ? "md" : "xl";
  const headingSize = ISSMALLERTHAN300 ? "lg" : "xl";
  const fieldNameTextSize = ISSMALLERTHAN300
    ? "md"
    : ISLARGERTHAN550
    ? "2xl"
    : "xl";
  const contentTextSize = ISSMALLERTHAN300
    ? "sm"
    : ISLARGERTHAN550
    ? "xl"
    : "lg";

  const handleEditPersonalInfoButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    buttonName === "Edit Information"
      ? setButtonName("Save Information")
      : setButtonName("Edit Information");

    setFormView(!formView);
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
    onSuccess: () => {
      console.log("Account update success");
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

  return (
    <>
      <Card sx={container}>
        <Text fontSize={"md"}>
          You can manage all of your personal information here.
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
            <Text>{firstName}</Text>
            <Flex
              paddingTop="10px"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text>Will Eventually Add Account Edits Here</Text>
            </Flex>
          </Box>
        </Flex>
        <Button
          variant="ghost"
          fontSize={"sm"}
          alignSelf={"flex-end"}
          onClick={handleEditPersonalInfoButton}
          pr={0}
        >
          {buttonName}
        </Button>
      </Card>
    </>
  );
};

export default UserAccountDetailsCard;
