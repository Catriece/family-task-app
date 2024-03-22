import { FC, useEffect } from "react";
import { Flex, Grid, GridItem, useMediaQuery, Center } from "@chakra-ui/react";
import WeeklyCalendarComponent from "../../components/calendar/weekly-calendar-component";
import TaskModalForm from "../../components/tasks/task-modal";
import { useModal } from "../../context/modal/modal-context";
import MenuComponent from "../../components/menu/menu-component";
import UserBioCard from "../../components/user/user-card";
import { LG, SM, XXL } from "../../components/styles";
import SearchBarComponent from "../../components/search/search-bar-component";
import TaskByWeekCalendarComponent from "../../components/calendar/task-calendar-component";
import { useTask } from "../../context/tasks/task-context";
import { useLoaderData } from "react-router-dom";
//import { User } from "@auth0/auth0-react";

const DashboardPage: FC = () => {
  const [isLargerThan525] = useMediaQuery("(min-width: 525px)");

  const columns = isLargerThan525 ? "repeat(12, 1fr)" : "repeat(4, 1fr)";
  const gap = isLargerThan525 ? LG : SM;
  const margin = isLargerThan525 ? XXL : SM;
  const data: any = useLoaderData();

  const initCount: number = data.get("initialCount");
  const { setTaskCount, taskCount } = useTask();

  useEffect(() => {
    setTaskCount(initCount);
  }, []);

  const { openModal } = useModal();

  return (
    <Grid
      h="100vh"
      w="100vw"
      gridTemplateColumns={columns}
      gridTemplateRows="auto 1fr"
      gap={gap}
      margin={`${20}, ${margin}, 0`}
    >
      <GridItem colEnd={5}>
        <Flex justifyContent="flex-end">
          <MenuComponent /> <TaskModalForm />
        </Flex>
      </GridItem>
      <GridItem colSpan={4}>
        <UserBioCard />
      </GridItem>
      <GridItem colSpan={4}>
        <Center>
          <WeeklyCalendarComponent />
        </Center>
      </GridItem>
      <GridItem colSpan={4}>
        <SearchBarComponent />
      </GridItem>
      <GridItem colSpan={4}>
        <TaskByWeekCalendarComponent />
      </GridItem>
    </Grid>
  );
};

export default DashboardPage;
