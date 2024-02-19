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

const container = {
  borderRadius: "50px",
  background: "#e0e0e0",
  FlexShadow: "20px 20px 60px #bebebe -20px -20px 60px #ffffff",
  padding: "20px 30px",
};

const UserAccountCard: FC<AccountInfo> = ({ firstName, lastName, email }) => {
  const [editInput, setEditInput] = useState<boolean>(true);
  const [name, setName] = useState<string>(firstName + " " + lastName);

  return (
    <>
      <Card sx={container}>
        <Center>
          <Avatar size="xl" />
        </Center>

        <Text fontSize={"xl"} fontWeight={700} mt={"10px"} mb={2}>
          Personal Information
        </Text>
        <Flex alignItems={"center"}>
          <Text fontSize={"md"} pl={5} mb={2} fontWeight={525}>
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
        <Flex alignItems={"center"}>
          <Text fontSize={"md"} pl={5} mb={2} fontWeight={525}>
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
        <Flex alignItems={"center"}>
          <Text fontSize={"md"} pl={5} mb={2} fontWeight={525}>
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

export default UserAccountCard;
