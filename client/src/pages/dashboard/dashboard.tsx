import { FC, useEffect } from "react";
import { Flex, Grid, GridItem, Center } from "@chakra-ui/react";
import WeeklyCalendarComponent from "../../components/calendar/weekly-calendar-component";
import TaskModalForm from "../../components/tasks/task-modal";
import { useModal } from "../../context/modal/modal-context";
import MenuComponent from "../../components/menu/menu-component";
import UserBioCard from "../../components/user/user-card";
import { LG, SM, XXL } from "../../components/styles";
// import SearchBarComponent from "../../components/search/search-bar-component";
import TaskByWeekCalendarComponent from "../../components/calendar/task-calendar-component";
import { useTask } from "../../context/tasks/task-context";
import { useLoaderData } from "react-router-dom";
import TopNavigationBar from "../../components/navigation/top-nav-bar";
import mediaQueries from "../../components/constants";
import ProgressBar from "../../context/tasks/progress-bar";

const DashboardPage: FC = () => {
  const { ISLARGERTHAN525 } = mediaQueries();
  const gap = ISLARGERTHAN525 ? LG : SM;
  const data: any = useLoaderData();

  const initCount: number = data.get("initialCount");
  const { setTaskCount } = useTask();

  useEffect(() => {
    setTaskCount(initCount);
  }, []);

  return (
    <Grid
      position={"fixed"}
      top={0}
      left={0}
      templateAreas={
        ISLARGERTHAN525
          ? `"header header"
          "nav calendar"
    "nav main"
    "nav footer"`
          : `"header"
    "user"
    "calendar"
    "main"
    "footer"`
      }
      h="100vh"
      w="100vw"
      gridTemplateRows={
        ISLARGERTHAN525 ? "48pt 96pt 1fr 32pt" : "32pt 32pt 96pt 1fr 24pt"
      }
      gridTemplateColumns={ISLARGERTHAN525 ? "148pt 1fr" : "1fr"}
      gap={gap}
    >
      <GridItem as="nav" area="header">
        <Flex justifyContent="flex-end">
          {ISLARGERTHAN525 ? <TopNavigationBar /> : <MenuComponent />}
          <TaskModalForm />
        </Flex>
      </GridItem>

      {ISLARGERTHAN525 ? null : (
        <GridItem area="user">
          <UserBioCard />
        </GridItem>
      )}
      <GridItem area="calendar">
        <Center>
          <Flex flexDirection={"column"} justifyContent={"center"} w="90%">
            <WeeklyCalendarComponent />
            <ProgressBar />
          </Flex>
        </Center>
      </GridItem>
      {/* <GridItem colSpan={4}>
        <SearchBarComponent />
      </GridItem> */}
      <GridItem area="main" overflow={"scroll"}>
        <TaskByWeekCalendarComponent />
      </GridItem>
      <GridItem area="footer" overflow={"scroll"}>
        <Center> &copy; SimplyDo 2024 </Center>
      </GridItem>
    </Grid>
  );
};

export default DashboardPage;
