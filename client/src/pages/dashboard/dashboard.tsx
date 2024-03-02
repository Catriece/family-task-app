import { FC } from "react";
import HeaderComponent from "../../components/header/header";
import {
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import WeeklyCalendarComponent from "../../components/calendar/weekly-calendar-component";
import TodoModalForm from "../../components/todos/modal-create-todo";
import TodoComponent from "../../components/todos/todo-component";
import { useModal } from "../../context/modal-context";
import MenuComponent from "../../components/menu/menu-component";
import { AddIcon } from "@chakra-ui/icons";
// import MobileNavigation from "../components/navigation/mobile-navigation";
// import DaysOfTheWeek from "../components/calendar/daysOfTheWeek";

const DashboardPage: FC = () => {
  const [isLargerThan525] = useMediaQuery("(min-width: 525px)");

  const { openModal } = useModal();
  const data: any = useLoaderData();
  const user = data.get("user");

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
        isLargerThan525 ? "7% 100px 1fr 65px" : "7% 110px 95px 1fr 65px"
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
            Hey, {user.data.firstName}!
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

      <GridItem bg="green.300" area={"main"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          margin={"10px 7px"}
          borderRadius={"25px"}
        >
          <Text>Sort by</Text>
        </Flex>
        <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
          <TodoComponent />
        </Flex>
      </GridItem>
      <GridItem position={"fixed"} bottom={8} left={4} area={"footer"}>
        <Button
          borderRadius="20"
          leftIcon={<AddIcon fontSize={13} />}
          onClick={openModal}
          bgColor={"#FFDB58"}
        >
          Create Todo
        </Button>
        <TodoModalForm />
      </GridItem>
    </Grid>
  );
};

export default DashboardPage;
