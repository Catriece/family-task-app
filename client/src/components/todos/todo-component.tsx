import { FC } from "react";
import {
  Card,
  CardHeader,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Collapse,
  useDisclosure,
  Checkbox,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { TfiTrash } from "react-icons/tfi";
import { BiEditAlt } from "react-icons/bi";
import { useLoaderData, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteTodoFunction } from "../../functions/todo-mutations";

interface TodoData {
  title: string;
  description: string;
  priority: number;
  dueOn: string;
  index: string;
}

const TodoComponent: FC<TodoData> = ({
  title,
  description,
  priority,
  dueOn,
  index,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const data: any = useLoaderData();
  const { id } = useParams();

  const remove = useMutation({
    mutationFn: deleteTodoFunction,
    onSuccess: () => {
      console.log("Todo successfully deleted");
    },
    onError: () => {
      console.error("Todo unsuccessfully deleted");
    },
  });

  const deleteTodo = async () => {
    const token = localStorage.getItem("token");

    const formData = {
      token,
      notesId: Number(index),
      userId: id,
    };

    const response = await remove.mutateAsync(formData);
    console.log(response);
  };

  const editTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e, "edit button");
  };

  return (
    <Card
      w="90%"
      mb={3}
      key={index}
      borderColor={priority === 1 ? "red.500" : "green.500"}
      borderWidth=".1em"
      bg={priority === 1 ? "red.300" : "green.300"}
    >
      <CardHeader p={2} pt={3} pb={0}>
        <Flex flexDirection={"column"}>
          <Flex justifyContent={"space-between"}>
            <Heading size="md" pl={3}>
              {title}
            </Heading>
            <Box>
              <Checkbox variant={"square"} value={data.completed} />
            </Box>
          </Flex>

          <Flex alignItems={"center"} justifyContent={"flex-end"}>
            <Text fontWeight={500}>{dueOn}</Text>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />} // Description must also be present
              onClick={onToggle}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <Collapse in={isOpen} animateOpacity>
        <Flex alignItems={"center"}>
          <Box w={"80%"}>
            <Text
              alignSelf={"center"}
              pb={4}
              pl={5}
              fontWeight={400}
              fontSize={"sm"}
            >
              {description
                ? description
                : "Hey! Did you forget to add a description?"}
            </Text>
          </Box>
          <Flex justifyContent={"space-around"} w={"20%"}>
            <Box as="button" onClick={editTodo}>
              <BiEditAlt size="20px" />
            </Box>
            <Box as="button" onClick={deleteTodo}>
              <TfiTrash size="20px" />
            </Box>
          </Flex>
        </Flex>
      </Collapse>
    </Card>
  );
};

export default TodoComponent;
