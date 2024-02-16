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
  AtSignIcon,
  BellIcon,
  ChevronRightIcon,
  CloseIcon,
  InfoOutlineIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

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
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  const screenWidth = isLargerThan550 ? "80vw" : "90vw";
  const screenHeight = isLargerThan550 ? "125vh" : "100svh";

  return (
    <Grid
      templateAreas={`"header"
    "heading"
    "main"
    "footer"`}
      gridTemplateRows={"10% 20% 60% 10%"}
      h={screenHeight}
      w={screenWidth}
      gap="1"
    >
      <GridItem area={"header"}>HEADER WILL GO HERE</GridItem>
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
            <CloseIcon fontSize={"xl"} />
          </Box>
          <Text
            fontSize={"4xl"}
            fontWeight={700}
            pl={2}
            letterSpacing={".05rem"}
          >
            Settings
          </Text>
        </Flex>
      </GridItem>
      <GridItem
        area={"main"}
        bg="gray.300"
        borderRadius={15}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Flex flexDirection={"column"}>
          <Box
            as="button"
            sx={button}
            aria-labelledby="account"
            role="button"
            name="account"
            onClick={() => console.log("Clicked")}
            textAlign="left"
            h={"60px"}
          >
            <Avatar size={"sm"} />
            <Text id="account" pl={3} fontSize={"xl"} fontWeight={500}>
              Account
            </Text>
            <Box sx={{ flexGrow: 1 }} />
            <ChevronRightIcon boxSize={6} />
          </Box>
          <Box
            as="button"
            sx={button}
            aria-labelledby="members"
            role="button"
            name="members"
            onClick={() => console.log("Clicked")}
            textAlign="left"
            h={"60px"}
          >
            <AtSignIcon fontSize={"3xl"} />
            <Text id="members" pl={3} fontSize={"xl"} fontWeight={500}>
              Members
            </Text>
            <Box sx={{ flexGrow: 1 }} />
            <ChevronRightIcon boxSize={6} />
          </Box>
          <Box
            as="button"
            sx={button}
            aria-labelledby="notifications"
            role="button"
            name="notifications"
            onClick={() => console.log("Clicked")}
            textAlign="left"
            h={"60px"}
          >
            <BellIcon fontSize={"3xl"} />
            <Text id="notifications" pl={3} fontSize={"xl"} fontWeight={500}>
              Notifications
            </Text>
            <Box sx={{ flexGrow: 1 }} />
            <ChevronRightIcon boxSize={6} />
          </Box>
          <Box
            as="button"
            aria-labelledby="statistics"
            role="button"
            name="statistics"
            sx={button}
            onClick={() => console.log("Clicked")}
            textAlign="left"
            h={"60px"}
          >
            <InfoOutlineIcon fontSize={"3xl"} />
            <Text id="statistics" pl={3} fontSize={"xl"} fontWeight={500}>
              Statistics
            </Text>
            <Box sx={{ flexGrow: 1 }} />
            <ChevronRightIcon boxSize={6} />
          </Box>
          <Divider marginTop={"20px"} marginBottom={"20px"} />
        </Flex>
        <Flex flexDirection={"column-reverse"}>
          <Box
            as="button"
            aria-labelledby="settings"
            role="button"
            name="settings"
            sx={button}
            onClick={() => console.log("Clicked")}
            textAlign="left"
            h={"60px"}
          >
            <SettingsIcon fontSize={"3xl"} />
            <Text id="settings" pl={3} fontSize={"xl"} fontWeight={500}>
              Settings
            </Text>
            <Box sx={{ flexGrow: 1 }} />
            <ChevronRightIcon boxSize={6} />
          </Box>
        </Flex>
      </GridItem>
      <GridItem area={"footer"}></GridItem>
    </Grid>
  );
};

export default SettingsPage;
