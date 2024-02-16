import React, { FC, useContext, useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../../types";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import AuthContext from "../../auth/authContext";
import { loginFunction } from "../../functions/mutations";

import ForgotPasswordForm from "./forgot-password";

const LoginForm: FC = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false); // For showing and hiding password inputs
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const screenWidth = isLargerThan800 ? "450px" : "280px"; // Changes the width of form container based on screen size

  const navigate = useNavigate();

  // FUNCTIONS

  const handleFieldInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (errorMessage) setErrorMessage(false); // Removes error message upon input field re-entry
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // TanStack Query - useMutation used for CUD functions

  const mutation = useMutation({
    mutationFn: loginFunction,
    onSuccess: (res) => {
      const { access_token, payload } = res.data;

      localStorage.setItem("token", access_token); // Set Token in LS
      login({ userCredentials: payload, token: access_token }); // Giving info to context to be used throughout the application

      navigate(`/dashboard/${payload.id}`); //Navigate to user dashboard
    },

    onError: () => setErrorMessage(true), // maybe console log the error?
  });

  return (
    <Center>
      <Box
        w={screenWidth}
        p={5}
        borderWidth={isLargerThan550 ? "1px" : "0px"}
        borderRadius="lg"
        boxShadow={isLargerThan550 ? "2xl" : "none"}
      >
        {forgotPassword ? (
          <ForgotPasswordForm />
        ) : (
          <>
            <Stack spacing={6}>
              <Text fontSize="3xl" fontWeight={700} textAlign="center">
                Login
              </Text>
              <span></span>
              <FormControl variant="floating">
                <Input
                  aria-labelledby="email-label"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  h="40px"
                  value={formData.email}
                  onChange={handleFieldInput}
                />
                <FormLabel id="email-label">Email</FormLabel>
              </FormControl>

              <FormControl variant="floating">
                <InputGroup>
                  <Input
                    aria-labelledby="password-label"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    h="40px"
                    onChange={handleFieldInput}
                    required
                  />
                  <FormLabel id="password-label">Password</FormLabel>
                  <InputRightElement h="40px">
                    <Button name="password" onClick={handlePassword}>
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errorMessage ? (
                  <FormHelperText fontSize="small" color="red">
                    Invalid email address or password
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                onClick={() => {
                  mutation.mutate(formData);
                }}
              >
                Login
              </Button>
            </Stack>
          </>
        )}
        <Box>
          <Button
            variant="unstyled"
            isActive={false}
            onClick={() => setForgotPassword(!forgotPassword)}
            fontSize={"13px"}
            fontWeight={400}
          >
            {forgotPassword ? "Back to login" : "Forgot password?"}
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

export default LoginForm;
