import { FC, useEffect } from "react";
import { Flex, Grid, GridItem, Center, Spacer, Box } from "@chakra-ui/react";
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
import HeaderComponent from "../../components/header/header";

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
          ? `"logo header"
          "calendar progress"
    "calendar main"
    "calendar footer"`
          : `"header"
    "user"
    "calendar"
    "progress"
    "main"
    "footer"`
      }
      h="100vh"
      w="100vw"
      gridTemplateRows={
        ISLARGERTHAN525
          ? "4.5rem 6rem 1fr 2rem"
          : "2rem 4rem 5.5rem 3rem 1fr 1.5rem"
      }
      gridTemplateColumns={
        ISLARGERTHAN525
          ? ".0125rem 15.25rem 1fr .0125rem "
          : ".0125rem 1fr .0125rem"
      }
      gap={3}
    >
      {ISLARGERTHAN525 ? (
        <GridItem area="logo" colStart={2}>
          <HeaderComponent />
        </GridItem>
      ) : null}

      <GridItem as="nav" area="header" colStart={ISLARGERTHAN525 ? 3 : 2}>
        {ISLARGERTHAN525 ? <TopNavigationBar /> : <MenuComponent />}
        <TaskModalForm />
      </GridItem>

      {ISLARGERTHAN525 ? null : (
        <GridItem area="user" colStart={2}>
          <UserBioCard />
        </GridItem>
      )}

      <GridItem
        area="calendar"
        colStart={ISLARGERTHAN525 ? 2 : 2}
        rowStart={ISLARGERTHAN525 ? 3 : 0}
      >
        <Center>
          <Flex flexDirection={"column"} justifyContent={"center"} w="90%">
            <WeeklyCalendarComponent />
          </Flex>
        </Center>
      </GridItem>
      <GridItem
        w={ISLARGERTHAN525 ? "100%" : "100%"}
        area="progress"
        colStart={ISLARGERTHAN525 ? 3 : 2}
        placeContent="center"
      >
        <Flex justifyContent={"center"}>
          <ProgressBar />
        </Flex>
      </GridItem>

      <GridItem
        area="main"
        overflow={"scroll"}
        colStart={ISLARGERTHAN525 ? 3 : 2}
      >
        <TaskByWeekCalendarComponent />
      </GridItem>
      <GridItem area="footer" overflow={"scroll"}>
        <Center> &copy; SimplyDo 2024 </Center>
      </GridItem>
    </Grid>
  );
};

export default DashboardPage;
