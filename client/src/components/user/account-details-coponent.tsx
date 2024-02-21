import { FC } from "react";
import {
  Avatar,
  Flex,
  Card,
  Center,
  Text,
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { useState } from "react";
import { AccountInfo } from "../../types";
import mediaQueries from "../constants";

const container = {
  // borderRadius: "50px",
  background: "#e0e0e0",
  FlexShadow: "20px 20px 60px #bebebe -20px -20px 60px #ffffff",
  padding: "20px 10px",
};

const UserAccountDetailsCard: FC<AccountInfo> = ({
  firstName,
  lastName,
  email,
}) => {
  const { ISLARGERTHAN550, ISSMALLERTHAN300 } = mediaQueries();
  const [editInput, setEditInput] = useState<boolean>(true);
  const [name, setName] = useState<string>(firstName + " " + lastName);

  const avatarSize = ISSMALLERTHAN300 ? "md" : "xl";
  const headingSize = ISSMALLERTHAN300 ? "lg" : "xl";
  const textSize = ISSMALLERTHAN300 ? "sm" : ISLARGERTHAN550 ? "xl" : "md";
  // const paddingText = ISSMALLERTHAN300 ? 2 : 5;
  return (
    <>
      <Card sx={container}>
        <Center>
          <Avatar size={avatarSize} />
        </Center>

        <Text fontSize={headingSize} fontWeight={700} mt={"10px"} mb={2}>
          Personal Information
        </Text>
        <Flex alignItems={"center"} flexDirection={"column"}>
          <Text
            fontSize={textSize}
            pl={2}
            mb={2}
            fontWeight={600}
            alignSelf="flex-start"
          >
            Name:
          </Text>
          <Editable
            w={"90%"}
            defaultValue={name}
            isDisabled={editInput}
            pl={2}
            mb={2}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          {editInput ? null : (
            <Editable
              w={"90%"}
              defaultValue={lastName}
              isDisabled={editInput}
              pl={2}
              mb={2}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          )}
        </Flex>
        <Flex alignItems={"center"} flexDirection={"column"}>
          <Text
            fontSize={textSize}
            alignSelf="flex-start"
            pl={2}
            mb={2}
            fontWeight={600}
          >
            Email:
          </Text>
          <Editable
            w={"90%"}
            defaultValue={email}
            isDisabled={editInput}
            pl={2}
            mb={2}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Flex>
        <Flex alignItems={"center"} flexDirection={"column"}>
          <Text
            fontSize={textSize}
            alignSelf="flex-start"
            pl={2}
            mb={2}
            fontWeight={600}
          >
            Birthday:
          </Text>
          <Editable
            w={"90%"}
            defaultValue="BIRTHDAY"
            isDisabled={editInput}
            pl={2}
            mb={2}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Flex>
        <Flex justifyContent={"flex-end"}>
          {editInput ? (
            <Button variant="ghost" onClick={() => setEditInput(false)}>
              Edit Account Info
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setEditInput(true)}>
              Save Account Info
            </Button>
          )}
        </Flex>
      </Card>
    </>
  );
};

export default UserAccountDetailsCard;
