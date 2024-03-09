import { Center, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

import TodoComponent from "../todos/todo-component";
import { useLoaderData } from "react-router-dom";

const TodoByWeekCalendarComponent = () => {
  const today = dayjs().format("dddd, MMMM D, YYYY"); // current day
  const tomorrow = dayjs().add(1, "d").format("dddd, MMMM D, YYYY"); // current day

  let data: any = useLoaderData();
  const todos = data.get("todos").data;
  console.log("data: ", todos.length);

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      pt={5}
      pb={5}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      {todos.length > 0
        ? todos.map((todo: any, index: number) => {
            return (
              <TodoComponent
                key={index}
                index={todo.notesId}
                description={todo.description}
                dueOn={todo.dueOn}
                priority={todo.priority}
                title={todo.title}
              />
            );
          })
        : "Create new todo"}
    </Flex>
  );
};

export default TodoByWeekCalendarComponent;
