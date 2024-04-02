import { FC, useState } from "react";
import CreateAccountForm from "../../components/forms/create-account";
import LoginForm from "./login-form";
import {
  Box,
  Text,
  Center,
  Grid,
  GridItem,
  useMediaQuery,
  Button,
  Flex,
} from "@chakra-ui/react";
import LoginAuthenticationTabs from "../../components/navigation/authentication-tabs";

const LoginPage: FC = () => {
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const [pageView, setPageView] = useState<string>("login");

  return (
    <Center>
      <Grid
        templateAreas={`"navigation" "body"`}
        gridTemplateRows={isLargerThan550 ? "1fr" : "40px 1fr 40px"}
        gridTemplateColumns={"1fr"}
      >
        <GridItem area={"navigation"}>
          <LoginAuthenticationTabs />
        </GridItem>
        {pageView === "signup" && (
          <GridItem area={"body"}>
            {isLargerThan550 ? null : (
              <Box paddingTop="10px">
                <CreateAccountForm />
                <Flex justifyContent="center" alignItems="center">
                  <Text fontSize="sm" textAlign="center">
                    Already have an account?{" "}
                  </Text>
                  <Button
                    size="sm"
                    variant="tertiary"
                    onClick={() => setPageView("login")}
                  >
                    Login
                  </Button>
                </Flex>
              </Box>
            )}
          </GridItem>
        )}
        {pageView === "login" && (
          <GridItem area={"body"}>
            {isLargerThan550 ? null : (
              <Box paddingTop="10px">
                <LoginForm />
                <Flex justifyContent="center" alignItems="center">
                  <Text fontSize="small" textAlign="center">
                    Don't have an account yet?{" "}
                  </Text>
                  <Button
                    size="sm"
                    variant="tertiary"
                    onClick={() => setPageView("signup")}
                  >
                    Sign up!
                  </Button>
                </Flex>
              </Box>
            )}
          </GridItem>
        )}
      </Grid>
    </Center>
  );
};

export default LoginPage;
