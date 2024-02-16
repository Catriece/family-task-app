import { useState } from "react";
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
} from "@chakra-ui/react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isLargerThan800] = useMediaQuery("(min-width: 800px)"); // Found in login.tsx file. Make a constants file and import into both files.
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  const screenWidth = isLargerThan800 ? "350px" : "280px"; // Found in login.tsx file. Make a constants file and import into both files.

  const { id, token } = useParams();

  const handlePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submit = useMutation({
    mutationFn: async (password: string) => {
      return await axios.post("http://localhost:2883/auth/update-password", {
        password,
        token,
        id,
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

    const result = await submit.mutateAsync(password);

    console.log("Result of password change: ", result);
  };

  return (
    <Center>
      <Box
        w={screenWidth}
        p={5}
        borderWidth={isLargerThan550 ? "1px" : "0px"}
        borderRadius="lg"
        boxShadow={isLargerThan550 ? "2xl" : "none"}
        paddingTop="0px"
      >
        <Stack spacing={3}>
          <Text
            fontSize="3xl"
            fontWeight={700}
            textAlign="center"
            marginTop="30px"
          >
            Password Reset
          </Text>
          <span></span>
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
          <Button onClick={handlePasswordSubmission}>Change Password</Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default ResetPasswordPage;
