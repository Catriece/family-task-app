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
import mediaQueries from "../../components/constants";
import HeaderComponent from "../../components/header/header";

const LoginPage: FC = () => {
  const { ISLARGERTHAN750 } = mediaQueries();
  const [pageView, setPageView] = useState<string>("login");

  return (
    <Grid
      templateAreas={`"nav" "body" "footer"`}
      gridTemplateRows={"40pt 1fr 40pt"}
      gridTemplateColumns={"1fr"}
      height="100vh"
      width="100vw"
    >
      <GridItem area={"nav"} rowStart={1}>
        <Flex
          justifyContent={"space-between"}
          mt={5}
          mr={5}
          ml={8}
          alignItems={"center"}
        >
          <HeaderComponent fontSize="3xl" />
          {pageView === "signup" ? (
            <Button
              variant="ghost"
              fontSize={"2xl"}
              onClick={() => setPageView("login")}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="ghost"
              fontSize={"2xl"}
              onClick={() => setPageView("signup")}
            >
              Sign Up
            </Button>
          )}
        </Flex>
      </GridItem>
      {pageView === "signup" && (
        <Center>
          <GridItem
            area={"body"}
            rowStart={2}
            w={ISLARGERTHAN750 ? "45%" : "100%"}
          >
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
          </GridItem>
        </Center>
      )}
      {pageView === "login" && (
        <Center>
          <GridItem area={"body"}>
            <Box paddingTop="10px">
              <LoginForm />
              <Flex justifyContent="center" alignItems="center">
                <Text fontSize="MD" textAlign="center">
                  Don't have an account yet?{" "}
                </Text>
                <Button
                  size="MD"
                  variant="tertiary"
                  onClick={() => setPageView("signup")}
                  ml={2}
                >
                  Sign up!
                </Button>
              </Flex>
            </Box>
          </GridItem>
        </Center>
      )}
    </Grid>
  );
};

export default LoginPage;
