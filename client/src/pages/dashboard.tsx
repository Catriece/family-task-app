import { FC, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/authContext";
import { User } from "../types";
import Loader from "../components/loader";
import {
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SettingsPage from "./settings-page";
// import TodoForm from "../components/todos/todo-form";
// import TodoComponent from "../components/todos/todo-component";
// import MobileNavigation from "../components/navigation/mobile-navigation";
// import DaysOfTheWeek from "../components/calendar/daysOfTheWeek";

const DashboardPage: FC = () => {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isLargerThan525] = useMediaQuery("(min-width: 525px)");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsLoading(false);
      setCurrentUser(user);
    } else {
      setIsLoading(true);
    }
  }, [user]);

  const toSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/account/settings");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
            isLargerThan525 ? "80px 100px 1fr 50px" : "90px 110px 95px 1fr 50px"
          }
          gridTemplateColumns={isLargerThan525 ? "150px 1fr" : "1fr"}
          h="100vh"
          w="100vw"
          gap="1"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem pl="2" bg="orange.300" area={"header"}>
            <Button onClick={toSettings}>Settings</Button>
            <Text>&#8593;NOT MUCH HERE BUT CHECK OUT THIS NEW FEATURE!!!!</Text>
          </GridItem>
          <GridItem pl="2" area={"greeting"}>
            <Flex flexDirection="column" justifyContent="center">
              <Heading color="black" fontSize="38px" fontWeight={800}>
                Hey, {currentUser?.firstName}!
              </Heading>
              <Text color="black" fontSize="xl">
                Make today a great day!
              </Text>
            </Flex>
          </GridItem>
          <GridItem bg="pink.300" area={"nav"}>
            {/* {isLargerThan525 ? "hi" : <MobileNavigation />} */}
            {/* {isLargerThan525 ? "hi" : <DaysOfTheWeek />} */}
          </GridItem>

          <GridItem pl="2" bg="green.300" area={"main"}>
            {/* <TodoForm /> */}
            {/* <TodoComponent /> */}
          </GridItem>
          <GridItem pl="2" bg="blue.300" area={"footer"}>
            Footer
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default DashboardPage;
