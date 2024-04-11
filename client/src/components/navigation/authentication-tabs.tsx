import {
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useMediaQuery,
} from "@chakra-ui/react";
import LoginForm from "../../pages/login/login-form";
import CreateAccountForm from "../forms/create-account";

const LoginAuthenticationTabs = () => {
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  return (
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
            {isLargerThan550 ? <LoginForm /> : null}
          </Flex>
        </TabPanel>
        <TabPanel aria-labelledby="Create-An-Account-Tab">
          {isLargerThan550 ? <CreateAccountForm /> : null}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LoginAuthenticationTabs;
