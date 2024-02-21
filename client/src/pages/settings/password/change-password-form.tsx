import { useState, useEffect } from "react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  FormControl,
  Text,
  InputGroup,
  Input,
  FormLabel,
  InputRightElement,
  Button,
  Box,
  Center,
  Stack,
  useMediaQuery,
  Spacer,
} from "@chakra-ui/react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import mediaQueries from "../../../components/constants";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [currentPasswordError, setCurrentPasswordError] =
    useState<boolean>(false);
  const [showCurrentPassword, setShowcurrentPassword] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [disableButton, setDisableButton] = useState(true);

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const { ISLARGERTHAN550, ISLARGERTHAN800, ISSMALLERTHAN300 } = mediaQueries();

  // const screenWidth = isLargerThan800 ? "350px" : "280px"; // Found in login.tsx file. Make a constants file and import into both files.

  useEffect(() => {
    if (confirmPassword !== "" && password !== "" && currentPassword !== "")
      setDisableButton(false);
    else setDisableButton(true);
  }, [confirmPassword, password, currentPassword]);

  const headingTextSize = ISSMALLERTHAN300
    ? "xl"
    : ISLARGERTHAN550
    ? "3xl"
    : "2xl";

  const containerWidth = ISSMALLERTHAN300 ? "90vw" : "80vw";

  if (password === null || currentPassword === null || confirmPassword === null)
    setDisableButton(true);
  const handlePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submit = useMutation({
    mutationFn: async (params) => {
      console.log("Password", params);
      return await axios.post("http://localhost:2883/auth/reset-password", {
        params,
      });
    },
    onSuccess: () => {
      console.log("Password success"); // Maybe use a toast?
    },
    onError: () => {
      console.error("Error updating password");
    },
  });

  const handlePasswordSubmission = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Checks if password and confirm pasword fields match. Enables button if passwords match and email input is valid
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      throw new Error("Error changing user password.");
    } // sets error message if password and confirm password don't match

    console.log("Does this console.log?");

    const passwordPkg = {
      password,
      id,
      token: token || null,
    };

    console.log("PSPKG", passwordPkg);
    const result = await submit.mutateAsync();

    console.log("Result of password change: ", result);
  };

  return (
    <Stack spacing={1}>
      <Text fontSize={headingTextSize} fontWeight={700} textAlign="center">
        Change Password
      </Text>
      <span></span>
      <Center>
        <Box w={containerWidth}>
          <Text fontSize={"medium"} textAlign="left">
            Enter your current password
          </Text>
          <FormControl variant="floating">
            <InputGroup>
              <Input
                aria-labelledby="current-password-label"
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="currentPassword"
                isInvalid={currentPasswordError}
                value={currentPassword}
                focusBorderColor={currentPasswordError ? "red.300" : "blue.300"}
                errorBorderColor="red.300"
                h="40px"
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <FormLabel id="currentPassword-label">Current Password</FormLabel>
              <InputRightElement>
                <Button name="currentPassword" onClick={handlePassword}>
                  {showCurrentPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <br />
          </FormControl>
          <Text fontSize={"medium"} textAlign="left">
            Enter your new password
          </Text>
          <FormControl variant="floating">
            <InputGroup>
              <Input
                aria-labelledby="password-label"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                isInvalid={passwordError}
                value={password}
                focusBorderColor={passwordError ? "red.300" : "blue.300"}
                errorBorderColor="red.300"
                h="40px"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FormLabel id="password-label">Password</FormLabel>
              <InputRightElement>
                <Button name="password" onClick={handlePassword}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <br />
          </FormControl>
          <Text fontSize={"medium"} textAlign="left">
            Re-enter your new password
          </Text>
          <FormControl variant="floating">
            <InputGroup>
              <Input
                aria-labelledby="confirmPassword-label"
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                isInvalid={confirmPasswordError}
                value={confirmPassword}
                focusBorderColor={confirmPasswordError ? "red.300" : "blue.300"}
                errorBorderColor="red.300"
                h="40px"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FormLabel id="confirmPassword-label">Confirm Password</FormLabel>
              <InputRightElement>
                <Button name="confirmPassword" onClick={handleConfirmPassword}>
                  {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {confirmPasswordError ? (
              <Text fontSize="small" color="red.300">
                Password and Confirm Password do not match.
              </Text>
            ) : null}
          </FormControl>
          <br />
          <Center>
            <Button
              isDisabled={disableButton}
              bg="red.300"
              onClick={handlePasswordSubmission}
            >
              Change Password
            </Button>
          </Center>
        </Box>
      </Center>
    </Stack>
  );
};

export default ChangePasswordPage;
