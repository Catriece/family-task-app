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
  IconButton,
} from "@chakra-ui/react";

import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import mediaQueries from "../../../components/constants";
import { ChangePassword } from "../../../types";
import { changePasswordFunction } from "../../../functions/user-mutations";
import { AxiosError } from "axios";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState<ChangePassword>({
    id: "",
    newPassword: "",
    currentPassword: "",
  });

  // Current Password State
  const [currentPasswordError, setCurrentPasswordError] =
    useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] =
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

  // Params needed for change password route
  const { id } = useParams();
  const toast = useToast();
  //const token = localStorage.getItem("token" || null);

  // Media Queries
  const { ISLARGERTHAN550, ISSMALLERTHAN300 } = mediaQueries();
  const containerWidth = ISSMALLERTHAN300 ? "90vw" : "80vw";
  const headingTextSize = ISSMALLERTHAN300
    ? "md"
    : ISLARGERTHAN550
    ? "xl"
    : "lg";

  const handleFieldInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.currentTarget.name === "currentPassword") {
      if (currentPasswordError) setCurrentPasswordError(false);
    }

    if (e.currentTarget.name === "newPassword") {
      if (passwordError) {
        setPasswordError(false);
        setConfirmPasswordError(false);
      }
    }

    if (e.currentTarget.name === "confirmPassword") {
      if (currentPasswordError) {
        setPasswordError(false);
        setConfirmPasswordError(false);
      }
    }

    // Removes error message upon input field re-entry
    if (e.currentTarget.name !== "confirmPassword") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        //token: token,
        id: id,
      });
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const handleCurrentPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowCurrentPassword(!showCurrentPassword);
  };

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
      setFormData({
        id: "",
        newPassword: "",
        currentPassword: "",
      });
      setConfirmPassword("");

      toast({
        title: "Password Reset",
        description: "Your password was successfully reset.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (res) => {
      console.log("Error updating password", res.message);

      if (res.message === "Request failed with status code 401")
        setCurrentPasswordError(true);

      if (formData.newPassword !== confirmPassword) {
        setPasswordError(true);
        setConfirmPasswordError(true);
      }
      toast({
        title: "Password Reset",
        description: "There was an error updating your password.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return (
    <Stack spacing={1}>
      <Text fontSize={headingTextSize} mb={5}>
        You can change your password here.
      </Text>
      <Center>
        <Box w={containerWidth} maxW={"600px"} h={"100dvh"}>
          <FormControl variant="floating">
            <InputGroup>
              <Input
                aria-labelledby="current-password-label"
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="Current password"
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
                <IconButton
                  aria-label="Show current password text"
                  variant="tertiary"
                  name="currentPassword"
                  onClick={handleCurrentPassword}
                >
                  {showCurrentPassword ? <ViewOffIcon /> : <ViewIcon />}
                </IconButton>
              </InputRightElement>
            </InputGroup>
            {currentPasswordError && (
              <Text fontSize="small" color="red.300">
                Current Password is incorrect.
              </Text>
            )}
            <br />
          </FormControl>

          <FormControl variant="floating">
            <InputGroup>
              <Input
                aria-labelledby="password-label"
                id="password"
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                isInvalid={passwordError}
                value={formData.newPassword}
                focusBorderColor={passwordError ? "red.300" : "blue.300"}
                errorBorderColor="red.300"
                h="40px"
                onChange={handleFieldInput}
                required
              />
              <FormLabel id="password-label">New Password</FormLabel>
              <InputRightElement>
                <IconButton
                  variant="tertiary"
                  aria-label="Show new password text"
                  name="password"
                  onClick={handlePassword}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </IconButton>
              </InputRightElement>
            </InputGroup>
            <br />
          </FormControl>

          <FormControl variant="floating">
            <InputGroup>
              <Input
                aria-labelledby="confirmPassword-label"
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                isInvalid={confirmPasswordError}
                value={confirmPassword}
                focusBorderColor={confirmPasswordError ? "red.300" : "blue.300"}
                errorBorderColor="red.300"
                h="40px"
                onChange={handleFieldInput}
                required
              />
              <FormLabel id="confirmPassword-label">
                Confirm New Password
              </FormLabel>
              <InputRightElement>
                <IconButton
                  aria-label="Show confirm password text"
                  variant="tertiary"
                  name="confirmPassword"
                  onClick={handleConfirmPassword}
                >
                  {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                </IconButton>
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
              variant="primary"
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
