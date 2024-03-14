import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
} from "@chakra-ui/react";
import TaskComponent from "../tasks/task-component";

const MobileNavigation = () => {
  return (
    <Center>
      <Tabs h="60px" w="90%" isFitted>
        <TabList mb="1em">
          <Tab fontSize="xl" fontWeight={500}>
            Tasks
          </Tab>
          <Tab fontSize="xl" fontWeight={500}>
            Calendar
          </Tab>
          <Tab fontSize="xl" fontWeight={500}>
            Profile
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{/* <TaskComponent /> */}</TabPanel>
          <TabPanel>
            <p>Calendar?</p>
          </TabPanel>
          <TabPanel>
            <p>Profile</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default MobileNavigation;
