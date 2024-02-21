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
  useToast,
} from "@chakra-ui/react";

import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import mediaQueries from "../../../components/constants";
import { ChangePassword } from "../../../types";
import { changePasswordFunction } from "../../../functions/mutations";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState<ChangePassword>({
    id: "",
    token: "",
    newPassword: "",
    currentPassword: "",
  });

  // Current Password State
  const [currentPasswordError, setCurrentPasswordError] =
    useState<boolean>(false);
  const [showCurrentPassword, setShowcurrentPassword] =
    useState<boolean>(false);

  // New Password State
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Confirm New Password State
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [disableButton, setDisableButton] = useState(true); // Enable/Disable Button

  // Params needed for change password route
  const { id } = useParams();
  const toast = useToast();
  const token = localStorage.getItem("token" || null);

  // Media Queries
  const { ISLARGERTHAN550, ISSMALLERTHAN300 } = mediaQueries();
  const containerWidth = ISSMALLERTHAN300 ? "90vw" : "80vw";
  const headingTextSize = ISSMALLERTHAN300
    ? "xl"
    : ISLARGERTHAN550
    ? "3xl"
    : "2xl";

  // Enables/Disable submit button based on presence of inputs
  useEffect(() => {
    if (
      confirmPassword !== "" &&
      formData.newPassword !== "" &&
      formData.currentPassword !== ""
    )
      setDisableButton(false);
    else setDisableButton(true);
  }, [confirmPassword, formData.newPassword, formData.currentPassword]);

  const handleFieldInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (passwordError) setPasswordError(false); // Removes error message upon input field re-entry
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      token: token,
      id: id,
    });
  };

  // if (
  //   formData.password === null ||
  //   currentPassword === null ||
  //   (confirmPassword === null && formData.password === confirmPassword)
  // )
  //   setDisableButton(true);

  const handlePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submit = useMutation({
    mutationFn: changePasswordFunction,
    onSuccess: () => {
      console.log("Password success");
      toast({
        title: "Password Reset",
        description: "Your password was successfully reset.",
        status: "success",
        duration: 9000,
        isClosable: false,
      });
    },
    onError: () => {
      console.error("Error updating password");
      toast({
        title: "Password Reset",
        description: "There was an error updating your password.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  // const handlePasswordSubmission = async (
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   // Checks if password and confirm pasword fields match. Enables button if passwords match and email input is valid
  //   e.preventDefault();
  //   if (formData.password !== confirmPassword) {
  //     setConfirmPasswordError(true);
  //     throw new Error("Error changing user password.");
  //   } // sets error message if password and confirm password don't match

  //   console.log("Does this console.log?");

  //   const result = await submit.mutateAsync(passwordPkg);

  //   console.log("Result of password change: ", result);
  // };

  return (
    <Stack spacing={1}>
      <Text fontSize={headingTextSize} fontWeight={700} textAlign="center">
        Change Password
      </Text>
      <span></span>
      <Center>
        <Box w={containerWidth}>
          <Text fontSize={"medium"} textAlign="left" pb={3}>
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
                value={formData.currentPassword}
                focusBorderColor={currentPasswordError ? "red.300" : "blue.300"}
                errorBorderColor="red.300"
                h="40px"
                onChange={handleFieldInput}
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
          <Text fontSize={"medium"} textAlign="left" pb={3}>
            Enter your new password
          </Text>
          <FormControl variant="floating">
            <InputGroup>
              <Input
                aria-labelledby="password-label"
                id="password"
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="password"
                isInvalid={passwordError}
                value={formData.newPassword}
                focusBorderColor={passwordError ? "red.300" : "blue.300"}
                errorBorderColor="red.300"
                h="40px"
                onChange={handleFieldInput}
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
          <Text fontSize={"medium"} textAlign="left" pb={3}>
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
              onClick={() => {
                submit.mutate(formData);
              }}
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
