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
import { useLoaderData } from "react-router-dom";

const TodoComponent = () => {
  const { isOpen, onToggle } = useDisclosure();
  const data: any = useLoaderData();
  const todos = data.get("todos");

  return (
    <Flex flexDirection={"column"} w={"95%"}>
      {todos.data.map((todo: any, index: number) => {
        return (
          <Card w="100%" mb={3} key={index}>
            <CardHeader p={3} pb={0}>
              <Flex flexDirection={"column"}>
                <Flex justifyContent={"space-between"}>
                  <Text
                    color={todo.priority === 1 ? "red" : "black"}
                    fontWeight={500}
                  >
                    {todo.priority === 1 ? "High Priority" : "Low Priority"}
                  </Text>
                  <Checkbox variant={"square"} value={data.completed} />
                </Flex>
                <Box>
                  <Heading size="md" pl={3}>
                    {todo.title}
                  </Heading>
                </Box>
                <Flex justifyContent={"space-between"}>
                  <Tooltip label="See task description">
                    <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="See menu"
                      icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />} // Description must also be present
                      onClick={onToggle}
                    />
                  </Tooltip>
                  <Text>{todo.dueOn}</Text>
                </Flex>
              </Flex>
            </CardHeader>
            <Collapse in={isOpen} animateOpacity>
              <Text pb={4} pl={5} fontWeight={400} fontSize={"sm"}>
                {todo.description
                  ? todo.description
                  : "Hey! Did you forget to add a description?"}
              </Text>
            </Collapse>
          </Card>
        );
      })}
    </Flex>
  );
};

export default TodoComponent;
