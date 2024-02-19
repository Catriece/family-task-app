import {
  Flex,
  Center,
  Box,
  useMediaQuery,
  Text,
  Grid,
  GridItem,
  Button,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import ChangePasswordPage from "../components/forms/account-settings/change-password-form";
import {
  ArrowLeftIcon,
  AtSignIcon,
  BellIcon,
  ChevronRightIcon,
  CloseIcon,
  InfoOutlineIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { useContext, useState } from "react";
import UserAccountCard from "../components/user/user-card-component";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../auth/authContext";

const desktop = {
  border: "gray solid .5px",
  padding: "20px 10px",
  width: "90%",
};

const mobile = {
  padding: "20px 10px",
};

const button = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "0 20px",
};

const SettingsPage = () => {
  const { logout } = useContext(AuthContext);
  const [currentScreen, setCurrentScreen] = useState<string>("options");

  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  // Responsive Design
  const screenWidth = isLargerThan550 ? "80vw" : "90vw";
  const screenHeight = isLargerThan550 ? "125vh" : "100svh";
  const textSize = isLargerThan550 ? "xl" : "sm";
  const iconSize = isLargerThan550 ? "3xl" : "2xl";
  const avatarSize = isLargerThan550 ? "sm" : "xs";

  const data: any = useLoaderData();

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(data.data);

  return (
    <Grid
      templateAreas={`"header"
    "heading"
    "main"
    "footer"`}
      gridTemplateRows={"8% 15% 70% 7%"}
      h={screenHeight}
      w={screenWidth}
      gap="1"
    >
      <GridItem area={"header"}>
        <Text>HEADER WILL GO HERE</Text>
      </GridItem>
      <GridItem area={"heading"}>
        <Flex
          justifyContent={"space-between"}
          flexDirection={"column"}
          h={"100%"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {currentScreen === "options" ? null : (
              <ArrowLeftIcon
                fontSize={"sm"}
                onClick={() => setCurrentScreen("options")}
              />
            )}
            <Box sx={{ flexGrow: 1 }} />
            <CloseIcon
              fontSize={"sm"}
              onClick={() => navigate(`/dashboard/${id}`)}
            />
          </Box>
          <Text
            fontSize={"4xl"}
            fontWeight={700}
            pl={2}
            pb={2}
            letterSpacing={".05rem"}
          >
            {currentScreen === "options" ? "Settings" : currentScreen}
          </Text>
        </Flex>
      </GridItem>
      {currentScreen === "options" && (
        <GridItem
          area={"main"}
          bg="gray.300"
          borderRadius={15}
          h={"100%"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Flex flexDirection={"column"} justifyContent={"center"}>
            <Box
              as="button"
              sx={button}
              aria-labelledby="account"
              role="button"
              name="account"
              onClick={() => setCurrentScreen("Account Information")}
              textAlign="left"
              h={"60px"}
            >
              <Avatar size={avatarSize} />
              <Text id="account" pl={3} fontSize={textSize} fontWeight={500}>
                Account
              </Text>
              <Box sx={{ flexGrow: 1 }} />
              <ChevronRightIcon
                boxSize={6}
                onClick={() => setCurrentScreen("Account Information")}
              />
            </Box>
            <Box
              as="button"
              sx={button}
              aria-labelledby="members"
              role="button"
              name="members"
              onClick={() => setCurrentScreen("Members")}
              textAlign="left"
              h={"60px"}
            >
              <AtSignIcon fontSize={iconSize} />
              <Text id="members" pl={3} fontSize={textSize} fontWeight={500}>
                Members
              </Text>
              <Box sx={{ flexGrow: 1 }} />
              <ChevronRightIcon
                boxSize={6}
                onClick={() => setCurrentScreen("Members")}
              />
            </Box>
            <Box
              as="button"
              sx={button}
              aria-labelledby="notifications"
              role="button"
              name="notifications"
              onClick={() => setCurrentScreen("Notifications")}
              textAlign="left"
              h={"60px"}
            >
              <BellIcon fontSize={iconSize} />
              <Text
                id="notifications"
                pl={3}
                fontSize={textSize}
                fontWeight={500}
              >
                Notifications
              </Text>
              <Box sx={{ flexGrow: 1 }} />
              <ChevronRightIcon
                boxSize={6}
                onClick={() => setCurrentScreen("Notifications")}
              />
            </Box>
            <Box
              as="button"
              aria-labelledby="statistics"
              role="button"
              name="statistics"
              sx={button}
              onClick={() => setCurrentScreen("Statistics")}
              textAlign="left"
              h={"60px"}
            >
              <InfoOutlineIcon fontSize={iconSize} />
              <Text id="statistics" pl={3} fontSize={textSize} fontWeight={500}>
                Statistics
              </Text>
              <Box sx={{ flexGrow: 1 }} />
              <ChevronRightIcon
                boxSize={6}
                onClick={() => setCurrentScreen("Statistics")}
              />
            </Box>
            <Divider marginTop={"20px"} marginBottom={"20px"} />
          </Flex>
          <Flex flexDirection={"column"}>
            <Box
              as="button"
              aria-labelledby="settings"
              role="button"
              name="settings"
              sx={button}
              onClick={() => setCurrentScreen("Settings")}
              textAlign="left"
              h={"60px"}
            >
              <SettingsIcon fontSize={iconSize} />
              <Text id="settings" pl={3} fontSize={textSize} fontWeight={500}>
                Settings
              </Text>
              <Box sx={{ flexGrow: 1 }} />
              <ChevronRightIcon
                boxSize={6}
                onClick={() => setCurrentScreen("Settings")}
              />
            </Box>
            <Center>
              <Button onClick={() => logout()} bg="red.300" w={"50%"}>
                Logout
              </Button>
            </Center>
            <Box>
              <Center>
                <Button variant="ghost" fontSize={"xs"}>
                  Delete Account
                </Button>
              </Center>
            </Box>
          </Flex>
        </GridItem>
      )}
      {currentScreen === "Account Information" && (
        <UserAccountCard
          firstName={data.data.firstName}
          lastName={data.data.lastName}
          email={data.data.email}
        />
      )}
      {currentScreen === "Members" && (
        <Center>
          <Text>Don't worry! This feature is coming soon :D</Text>
        </Center>
      )}
      {currentScreen === "Notifications" && (
        <Center>
          <Text>Don't worry! This feature is coming soon :D</Text>
        </Center>
      )}
      {currentScreen === "Statistics" && (
        <Center>
          <Text>Don't worry! This feature is coming soon :D</Text>
        </Center>
      )}
      {currentScreen === "Settings" && (
        <Center>
          <Text>Don't worry! This feature is coming soon :D</Text>
        </Center>
      )}
      <GridItem area={"footer"}></GridItem>
    </Grid>
  );
};

export default SettingsPage;
