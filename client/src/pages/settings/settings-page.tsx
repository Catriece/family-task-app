import {
  Flex,
  Center,
  Box,
  Text,
  Grid,
  GridItem,
  Button,
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
  ChevronRightIcon,
  CloseIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";

import UserAccountDetailsCard from "./account-settings/account-details-coponent";
import ChangePasswordPage from "./password/change-password-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import mediaQueries from "../../components/constants";
import { deleteUserFunction } from "../../functions/user-mutations";
import { useMutation } from "@tanstack/react-query";

const button = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "0 20px",
};

const SettingsPage = () => {
  const { user } = useContext(AuthContext);
  const { ISLARGERTHAN550, ISSMALLERTHAN300 } = mediaQueries();
  const { logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentScreen, setCurrentScreen] = useState<string>("options");
  const [modalBody, setModalBody] = useState<boolean>(false);

  // Necessary for Account Deletion
  const [password, setPassword] = useState<string>("");
  const token = localStorage.getItem("token");

  console.log("User", user);
  console.log("Token", token);

  // Delete account error handling
  const [errorDeletingAccount, setErrorDeletingAccount] =
    useState<boolean>(false);

  // Responsive Design
  const screenWidth = ISLARGERTHAN550 ? "80vw" : "90vw";
  const screenHeight = ISLARGERTHAN550 ? "100vh" : "90svh";
  const textSize = ISSMALLERTHAN300 ? "md" : ISLARGERTHAN550 ? "xl" : "lg";
  const iconSize = ISLARGERTHAN550 ? "3xl" : "2xl";

  const data: any = useLoaderData();

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setModalBody(false);
    }
  }, [isOpen]);

  console.log("Data from browser router", data);

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
    const payload = { password, id };
    const response = deleteUser.mutateAsync(payload);
    return response;
  };

  return (
    <Grid
      templateAreas={`
    "heading"
    "main"`}
      gridTemplateRows={"15% 1fr 7%"}
      h={screenHeight}
      w={screenWidth}
      gap="1"
    >
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
              marginTop: 4,
            }}
          >
            {currentScreen === "options" ? null : (
              <Flex
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
                onClick={() => {
                  navigate(`/account/settings/${id}`); // Repulls loader data
                  setCurrentScreen("options");
                }}
              >
                <ArrowLeftIcon fontSize={"xs"} />
                <Text fontSize={"lg"} ml={2}>
                  Settings
                </Text>
              </Flex>
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
      <GridItem
        area={"main"}
        h={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        {currentScreen === "options" ? (
          <>
            <Flex flexDirection={"column"} justifyContent={"center"}>
              <UserAccountDetailsCard
                firstName={data.firstName}
                lastName={data.lastName}
                email={data.email}
                preferredName={data.preferredName}
                profilePhoto={"test"}
              />

              <Divider marginTop={"20px"} marginBottom={"20px"} />
            </Flex>

            <Flex flexDirection={"column"} pb={5}>
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
                <Button
                  onClick={() => logout()}
                  variant="primary"
                  w={"50%"}
                  fontSize={ISLARGERTHAN550 ? "xl" : "lg"}
                  h={ISLARGERTHAN550 ? "44pt" : "32pt"}
                  mb={3}
                >
                  Logout
                </Button>
              </Center>
              <Box>
                <Center>
                  <Button
                    variant="ghost"
                    fontSize={ISLARGERTHAN550 ? "md" : "xs"}
                    color="red.500"
                    onClick={onOpen}
                  >
                    Delete Account
                  </Button>
                </Center>
              </Box>
            </Flex>
          </>
        ) : null}
        {currentScreen === "Change Password" && (
          <Center>
            <ChangePasswordPage />
          </Center>
        )}
      </GridItem>

      {/* Modal */}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalBody ? (
              <>
                <Stack spacing={6}>
                  <FormControl>
                    <FormLabel>Enter Your Password</FormLabel>
                    <Input
                      value={password}
                      borderColor="gray.500"
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
                  <Center>
                    <Button
                      bg="red.600"
                      border="none"
                      color="white"
                      onClick={handleDeleteUser}
                      w="75%"
                    >
                      Delete Your Account
                    </Button>
                  </Center>
                </Stack>
              </>
            ) : (
              <>
                <Text fontSize={"sm"}>
                  Hey {data.firstName},<br /> Deleting your account is a{" "}
                  <b>permanent action</b>, and will result in the permanent
                  removal of <b>all</b> data associated with your account from
                  our system.{" "}
                  <b>
                    This includes all tasks, task lists, and any other
                    information you've stored within the application
                  </b>
                  . <br />
                  <br />
                  If you have any tasks saved please make sure to save them
                  elsewhere <b>before</b> proceeding with the account deletion.
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
            <Button variant="primary" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="secondary"
              onClick={() => setModalBody(!modalBody)}
            >
              {modalBody ? "Back" : "Next"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default SettingsPage;
