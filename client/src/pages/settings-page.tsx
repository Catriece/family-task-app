import {
  Flex,
  Center,
  Box,
  useMediaQuery,
  Text,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import ChangePasswordPage from "../components/forms/account-settings/change-password-form";

const container = {
  border: "gray solid .5px",
  padding: "20px 10px",
};
const SettingsPage = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  const screenWidth = isLargerThan550 ? "80vw" : "90vw";

  return (
    <Flex>
      <Box sx={container}>
        <Text fontSize={"3xl"} fontWeight={600}>
          Account and Settings
        </Text>
        <Center>
          <Tabs
            orientation={isLargerThan550 ? "vertical" : "horizontal"}
            variant="enclosed"
            w={screenWidth}
            h={isLargerThan550 ? "60vh" : "90%"}
            maxW={"850px"}
          >
            <TabList>
              <Tab>Account Details</Tab>
              <Tab>Change Password</Tab>
              <Tab>Info</Tab>
              <Tab>Members and Groups</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>Account Details</TabPanel>
              <TabPanel>
                <Flex alignItems="center">
                  <ChangePasswordPage />
                </Flex>
              </TabPanel>
              <TabPanel>Info</TabPanel>
              <TabPanel>Members and Groups</TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Box>
    </Flex>
  );
};

export default SettingsPage;
