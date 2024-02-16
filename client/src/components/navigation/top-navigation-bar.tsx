import {
  Flex,
  useMediaQuery,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import LoginForm from "../forms/login";
import CreateAccountForm from "../forms/create-account";

const TopNavigationBar = () => {
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  return (
    <>
      {isLargerThan550 ? (
        <Tabs align="end" variant="enclosed" height="600px" width="450px">
          <TabList>
            <Tab>Login</Tab>
            <Tab>SignUp</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex justifyContent="center" marginTop="25%">
                <LoginForm />
              </Flex>
            </TabPanel>
            <TabPanel>
              <CreateAccountForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : null}
    </>
  );
};

export default TopNavigationBar;
