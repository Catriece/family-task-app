import { FC, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import { User } from "../../types";
import Loader from "../../components/loader";
import HeaderComponent from "../../components/header/header";
import {
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  useMediaQuery,
  Button,
  Box,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import WeeklyCalendarComponent from "../../components/calendar/weekly-calendar-component";
import TodoForm from "../../components/todos/modal-create-todo";
import TodoComponent from "../../components/todos/todo-component";
import { useModal } from "../../context/modal-context";
import { HamburgerIcon } from "@chakra-ui/icons";
import MenuComponent from "../../components/menu/menu-component";
// import TodoForm from "../components/todos/todo-form";
// import TodoComponent from "../components/todos/todo-component";
// import MobileNavigation from "../components/navigation/mobile-navigation";
// import DaysOfTheWeek from "../components/calendar/daysOfTheWeek";

const DashboardPage: FC = () => {
  const [isLargerThan525] = useMediaQuery("(min-width: 525px)");

  const { openModal } = useModal();
  const data: any = useLoaderData();

  return (
    <Grid
      templateAreas={
        isLargerThan525
          ? `"header header"
              "greeting greeting"
                  "nav main"
                  "nav footer"`
          : `"header"
              "greeting"
                  "nav"
                  "main"
                  "footer"`
      }
      gridTemplateRows={
        isLargerThan525 ? "7% 100px 1fr 50px" : "7% 110px 95px 1fr 50px"
      }
      gridTemplateColumns={isLargerThan525 ? "150px 1fr" : "1fr"}
      h="100vh"
      w="100vw"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" area={"header"}>
        <Flex justifyContent={"space-between"}>
          <HeaderComponent />
          <Flex alignItems={"center"}>
            {/* <Button fontSize={"sm"} variant="ghost" onClick={logout}>
              Logout
            </Button>
            <HamburgerIcon mr={2} /> */}
            <MenuComponent />
          </Flex>
        </Flex>
      </GridItem>
      <GridItem pl="2" area={"greeting"}>
        <Flex flexDirection="column" justifyContent="center">
          <Heading color="black" fontSize="38px" fontWeight={800}>
            Hey, {data.data.firstName}!
          </Heading>
          <Text color="black" fontSize="xl">
            Make today a great day!
          </Text>
        </Flex>
      </GridItem>
      <GridItem bg="pink.300" area={"nav"}>
        <WeeklyCalendarComponent />
        {/* {isLargerThan525 ? "hi" : <MobileNavigation />} */}
        {/* {isLargerThan525 ? "hi" : <DaysOfTheWeek />} */}
      </GridItem>

      <GridItem pl="2" bg="green.300" area={"main"}>
        <Button onClick={openModal}>Open Modal</Button>
        <TodoForm />
        <TodoComponent />
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default DashboardPage;
