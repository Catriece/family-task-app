import { FC } from "react";
import HeaderComponent from "../../components/header/header";
import {
  Flex,
  Text,
  Grid,
  GridItem,
  useMediaQuery,
  Button,
  Box,
  Select,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import WeeklyCalendarComponent from "../../components/calendar/weekly-calendar-component";
import TodoModalForm from "../../components/todos/modal-create-todo";
import { useModal } from "../../context/modal-context";
import MenuComponent from "../../components/menu/menu-component";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import UserBioCard from "../../components/user/user-card";
import { PRIMARYCOLOR } from "../../components/styles";
import SearchBarComponent from "../../components/search/search-bar-component";
import TodoByWeekCalendarComponent from "../../components/calendar/todo-calendar-component";

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
        isLargerThan525 ? "7% 10% 1fr 65px" : "7% 8% 90px 1fr 65px"
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
            <MenuComponent />
          </Flex>
        </Flex>
      </GridItem>

      <GridItem pl="2" area={"greeting"}>
        <Flex w={"100%"} zIndex={1} justifyContent="center">
          <UserBioCard />
        </Flex>
      </GridItem>

      <GridItem area={"nav"}>
        <Flex w={"100%"} zIndex={1} justifyContent={"center"}>
          <WeeklyCalendarComponent />
        </Flex>
      </GridItem>

      <GridItem area={"main"} marginTop={2}>
        <Flex
          w={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          zIndex={1}
        >
          <SearchBarComponent />
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          margin={"10px 7px"}
          borderRadius={"25px"}
          mt={5}
          ml={3}
          mr={3}
        >
          <Select placeholder="Sort by" w={"30%"} h={"25px"}>
            <option>Priority</option>
            <option>Upcoming</option>
            <option>Date</option>
          </Select>
          <Text fontSize={"lg"}>
            See all
            <ChevronRightIcon />
          </Text>
        </Flex>
        <Box position="fixed" w={"100%"}>
          <TodoByWeekCalendarComponent />
        </Box>
      </GridItem>
      <GridItem area={"footer"}>
        <Box position={"sticky"} overflow={"scroll"} bottom={10} left={4}>
          <Button
            borderRadius="20"
            textAlign={"left"}
            leftIcon={<AddIcon fontSize={13} />}
            onClick={openModal}
            bgColor={PRIMARYCOLOR}
          >
            Create Todo
          </Button>
        </Box>
        <TodoModalForm />
      </GridItem>
    </Grid>
  );
};

export default DashboardPage;
