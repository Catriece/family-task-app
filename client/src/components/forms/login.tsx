import React, { FC, useState } from "react";
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
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../../types";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false); // For showing and hiding password inputs
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const [formData, setFormData] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const screenWidth = isLargerThan800 ? "350px" : "280px"; // Changes the width of form container based on screen size

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
    mutationFn: (requestBody: LoginUser) => {
      return axios.post("http://localhost:2883/auth/login", requestBody); // Data sent from the client side to backend
    },
    onSuccess: () => navigate("/dashboard"),
    onError: () => setErrorMessage(true),
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
                onChange={handleFieldInput}
              />
              <FormLabel id="password-label">Password</FormLabel>
              <InputRightElement>
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
      </Box>
    </Center>
  );
};

export default LoginForm;
