import {
  Flex,
  useMediaQuery,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import LoginForm from "../../pages/login/login-form";
import CreateAccountForm from "../forms/create-account";

const TopNavigationBar = () => {
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  return (
    <>
      {isLargerThan550 ? (
        <Tabs align="end" variant="enclosed" height="600px" width="450px">
          <TabList
            role="region"
            aria-label="Tabs-For-Logging-In-or-New-Account-Creation"
          >
            <Tab
              id="Login-tab"
              role="navigation"
              aria-label="Login-To-Application-Tab"
            >
              Login
            </Tab>
            <Tab role="navigation" aria-label="Create-A-New-Account-Tab">
              SignUp
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel aria-labelledby="Login-Tab">
              <Flex justifyContent="center" marginTop="25%">
                <LoginForm />
              </Flex>
            </TabPanel>
            <TabPanel aria-labelledby="Create-An-Account-Tab">
              <CreateAccountForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : null}
    </>
  );
};

export default TopNavigationBar;
