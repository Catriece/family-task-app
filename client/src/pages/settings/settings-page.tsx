import {
  Flex,
  Center,
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  Avatar,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
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

import UserAccountDetailsCard from "./account-settings/account-details-coponent";
import ChangePasswordPage from "./password/change-password-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import mediaQueries from "../../components/constants";
import { deleteUserFunction } from "../../functions/mutations";
import { useMutation } from "@tanstack/react-query";

const button = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "0 20px",
};

const SettingsPage = () => {
  const { ISLARGERTHAN550, ISSMALLERTHAN300 } = mediaQueries();
  const { logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentScreen, setCurrentScreen] = useState<string>("options");
  const [modalBody, setModalBody] = useState<boolean>(false);

  // Necessary for Account Deletion
  const [password, setPassword] = useState<string>("");
  const token = localStorage.getItem("token");

  // Delete account error handling
  const [errorDeletingAccount, setErrorDeletingAccount] =
    useState<boolean>(false);

  // Responsive Design
  const screenWidth = ISLARGERTHAN550 ? "80vw" : "90vw";
  const screenHeight = ISLARGERTHAN550 ? "100vh" : "90svh";
  const textSize = ISSMALLERTHAN300 ? "md" : ISLARGERTHAN550 ? "xl" : "lg";
  const iconSize = ISLARGERTHAN550 ? "3xl" : "2xl";
  const avatarSize = ISLARGERTHAN550 ? "sm" : "xs";

  const data: any = useLoaderData();

  const navigate = useNavigate();
  const { id } = useParams();

  const deleteUser = useMutation({
    mutationFn: deleteUserFunction,
    onSuccess: () => {
      logout();
    },
    onError: () => {
      console.error("ERROR OCCURED");
      setErrorDeletingAccount(true);
    },
  });

  const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload = { password, token, id };
    const response = deleteUser.mutateAsync(payload);
    console.log(response);
    return response;
  };

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
                onClick={() => {
                  navigate(`/account/settings/${id}`); // Repulls loader data
                  setCurrentScreen("options");
                }}
              />
            )}
            <Box sx={{ flexGrow: 1 }} />
            <CloseIcon
              fontSize={"sm"}
              onClick={() => navigate(`/dashboard/${id}`)}
            />
          </Box>
          <Text
            fontSize={ISSMALLERTHAN300 ? "xl" : ISLARGERTHAN550 ? "4xl" : "3xl"}
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
          // bg="gray.30  0"
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
              aria-labelledby="change-password"
              role="button"
              name="change-password"
              sx={button}
              onClick={() => setCurrentScreen("Change Password")}
              textAlign="left"
              h={"60px"}
            >
              <SettingsIcon fontSize={iconSize} />
              <Text
                id="change-password"
                pl={3}
                fontSize={textSize}
                fontWeight={500}
              >
                Change Password
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
                <Button variant="ghost" fontSize={"xs"} onClick={onOpen}>
                  Delete Account
                </Button>
              </Center>
            </Box>
          </Flex>
        </GridItem>
      )}
      {/* Modal */}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Your Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalBody ? (
              <>
                <Stack spacing={6}>
                  <FormControl>
                    <FormLabel>Enter Your Password</FormLabel>
                    <Input
                      value={password}
                      onChange={(e) => {
                        setErrorDeletingAccount(false);
                        setPassword(e.target.value);
                      }}
                    />
                    {errorDeletingAccount ? (
                      <Text pl={5} fontSize={"sm"} color="red.500">
                        Incorrect password
                      </Text>
                    ) : null}
                  </FormControl>
                  <Button bg="red.300" onClick={handleDeleteUser}>
                    Delete Your Account
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Text fontSize={"sm"}>
                  Hey {data.data.firstName},<br /> Deleting your account is a{" "}
                  <b>permanent action</b>, and it will result in the permanent
                  removal of <b>all</b> data associated with your account from
                  our system.{" "}
                  <b>
                    This includes all tasks, task lists, and any other
                    information you've stored within the application
                  </b>
                  . <br />
                  <br />
                  If you have any tasks saved or shared with others, please make
                  sure to save them elsewhere <b>before</b> proceeding with the
                  account deletion. Once your account is deleted, all tasks and
                  lists created by you will be permanently removed from our
                  system.
                </Text>
                <br />
                <Text fontSize={"sm"}>
                  If you are ready to proceed. Click 'Next'. To exit, click
                  'Close'.
                </Text>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => setModalBody(!modalBody)}>
              {modalBody ? "Back" : "Next"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {currentScreen === "Account Information" && (
        <UserAccountDetailsCard
          firstName={data.data.firstName}
          lastName={data.data.lastName}
          email={data.data.email}
          preferredName={data.data.preferredName}
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
      {currentScreen === "Change Password" && (
        <Center>
          <ChangePasswordPage />
        </Center>
      )}
      <GridItem area={"footer"}></GridItem>
    </Grid>
  );
};

export default SettingsPage;
