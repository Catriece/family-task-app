// TODO: Change endpoint and place in a .env file
// TODO: Implement Password Regex (last thing)

import React, { FC, useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import AuthContext from "../../auth/authContext";
import { CreateUser } from "../../types";
import {
  Box,
  Button,
  Center,
  FormLabel,
  Input,
  Stack,
  useMediaQuery,
  Text,
  FormControl,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const CreateAccountForm: FC = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState<CreateUser>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<boolean>(false);
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false); // For showing and hiding password inputs
  const [passwordError] = useState<boolean>(false);
  const [showConfirmPasswordInput, setShowConfirmPasswordInput] =
    useState<boolean>(false); // For showing and hiding confirm password inputs

  const [passwordsDontMatch, setPasswordsDontMatch] = useState<boolean>(false); // State for Password and Confirm Password Match
  const [disableSubmitButton, setDisableSubmitButton] = useState<boolean>(true); // State for enabling or disabling button
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Media queries for styling mobile and desktop screens
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  // Changes the width of form container based on screen size
  const screenWidth = isLargerThan800 ? "450px" : "280px";

  // Allows me to reference the current/updated state
  const emailErrorReference = useRef<boolean>(false);
  const checkPasswordReference = useRef<number | null>(null);

  const navigate = useNavigate();

  // Email Regex for Validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // **PASSWORD REGEX IMPLEMENTATION
  //const passwordRegex =
  // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // Refreshes setTimeout when PW state is updated. This stalls UI error message
  useEffect(() => {
    if (checkPasswordReference.current !== null)
      clearTimeout(checkPasswordReference.current);

    checkPasswordReference.current = setTimeout(() => {
      checkPasswordMatch();
    }, 500);
  }, [confirmPassword, formData.email]);

  // Accounting for changes to Password field when the Confirm Password field already has value
  useEffect(() => {
    if (confirmPassword !== "") checkPasswordMatch();
  }, [formData.password]);

  // Database query to see if email is already in use before submission
  useEffect(() => {
    const isEmailInUse = async () => {
      if (emailRegex.test(formData.email)) {
        try {
          const res = await axios.post(
            "http://localhost:2883/auth/checkemail", // Create/change env variable
            { email: formData.email }
          ); // NESTJS expects to recieve an object
          if (res.data === true) {
            setEmailError(true);
            emailErrorReference.current = true;
          }
          if (res.data === false) {
            setEmailError(false);
            emailErrorReference.current = false; // Helps reference current state due to states async nature
          }
        } catch (error) {
          console.error("Error fetching email: ", error);
        }
      } else setEmailError(false);
    };

    isEmailInUse();
  }, [formData.email]);

  const checkPasswordMatch = () => {
    // Checks if password and confirm pasword fields match. Enables button if passwords match and email input is valid

    if (formData.password !== confirmPassword) {
      setPasswordsDontMatch(true); // sets error message if password and confirm password don't match
      setDisableSubmitButton(true); // Disables button if passwords don't match
    } else {
      emailRegex.test(formData.email) && emailErrorReference.current === false
        ? setDisableSubmitButton(false) // Enables button if email passes regex test
        : setDisableSubmitButton(true); // Keeps button disabled if email doesn't pass regex test

      setPasswordsDontMatch(false);
    }
  };

  // Handles form inputs
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name == "confirmPassword") {
      if (checkPasswordReference.current !== null)
        clearTimeout(checkPasswordReference.current);
      checkPasswordReference.current = setTimeout(() => {
        checkPasswordMatch();
      }, 500);

      setConfirmPassword(e.target.value);
    }
  };

  const handlePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPasswordInput(!showPasswordInput);
  };

  const handleConfirmPasswordVisibility = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowConfirmPasswordInput(!showConfirmPasswordInput);
  };

  // TanStack Query - useMutation used for CUD functions
  // How do I modularize this?

  const submitForm = useMutation({
    mutationFn: async (requestBody: CreateUser) => {
      if (formData.password !== confirmPassword) setPasswordsDontMatch(true); // I think this is checked elsewhere in this code

      return await axios.post(
        "http://localhost:2883/auth/signup", // MAKE AN ENV VARIABLE
        requestBody
      );
    },
  });

  const handleSubmitForm = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const userCreated = await submitForm.mutateAsync(formData); // adding user to database
      const { access_token, payload } = userCreated.data;

      login({ userCredentials: payload, token: access_token }); // Giving info to context to be used throughout the application
      navigate(`/dashboard/${payload.id}`); //Navigate to user dashboard
    } catch (error) {
      console.error(error);
      throw new Error("Error creating new user");
    }
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
        <Stack spacing={4}>
          <Text
            fontSize="3xl"
            fontWeight={700}
            textAlign="center"
            marginTop="30px"
          >
            Sign Up
          </Text>
          <span></span>

          <FormControl variant="floating">
            <Input
              aria-labelledby="email-label"
              name="email"
              id="email"
              placeholder="Email"
              required
              isInvalid={emailError}
              focusBorderColor={emailError ? "red.300" : "blue.300"}
              errorBorderColor="red.300"
              value={formData.email}
              onChange={handleInput}
            />
            <FormLabel id="email-label">Email</FormLabel>
            {emailError ? (
              <FormHelperText fontSize="small" color="red">
                Email is already in use.
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl variant="floating">
            <Input
              aria-labelledby="first-name-label"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              // isInvalid={invalid}
              focusBorderColor="blue.300"
              value={formData.firstName}
              onChange={handleInput}
              required
              min="2"
            />
            <FormLabel id="first-name-label">First Name</FormLabel>
          </FormControl>

          <FormControl variant="floating">
            <Input
              aria-labelledby="last-name-label"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              focusBorderColor="blue.300"
              required
              // isInvalid={invalid}
              value={formData.lastName}
              onChange={handleInput}
            />
            <FormLabel id="last-name-label">Last Name</FormLabel>
          </FormControl>

          <FormControl variant="floating">
            <InputGroup>
              <Input
                aria-labelledby="password-label"
                id="password"
                name="password"
                type={showPasswordInput ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                isInvalid={passwordError}
                focusBorderColor={passwordError ? "red.300" : "blue.300"}
                errorBorderColor="red.300"
                onChange={handleInput}
              />
              <FormLabel id="password-label">Password</FormLabel>
              <InputRightElement>
                <Button name="password" onClick={handlePasswordVisibility}>
                  {showPasswordInput ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {passwordError ? (
              <Box sx={{ height: "40px" }}>
                <Text fontSize="small" color="red" paddingTop="10px">
                  Password does not meet requirements.
                </Text>
              </Box>
            ) : null}
          </FormControl>

          <FormControl variant="floating">
            <InputGroup>
              <Input
                aria-labelledby="confirm-password-label"
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPasswordInput ? "text" : "password"}
                placeholder="Confirm Password"
                isInvalid={passwordsDontMatch}
                focusBorderColor={passwordsDontMatch ? "red.300" : "blue.300"}
                errorBorderColor="red.300"
                value={confirmPassword}
                onChange={handleInput}
              />
              <FormLabel>Confirm Password</FormLabel>
              <InputRightElement>
                <Button
                  name="confirmPassword"
                  onClick={handleConfirmPasswordVisibility}
                >
                  {showConfirmPasswordInput ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Box sx={{ height: "40px" }}>
              {passwordsDontMatch ? (
                <Text fontSize="small" color="red" paddingTop="10px">
                  Password and Confirm Password does not match
                </Text>
              ) : null}
            </Box>
          </FormControl>

          <Button isDisabled={disableSubmitButton} onClick={handleSubmitForm}>
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default CreateAccountForm;
