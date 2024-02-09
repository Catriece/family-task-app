import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormLabel,
  Input,
  FormControl,
  InputGroup,
  Text,
  FormHelperText,
  Center,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const [isLargerThan550] = useMediaQuery("(min-width: 550px)"); // Found in login.tsx file. Make a constants file and import into both files.
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)"); // Found in login.tsx file. Make a constants file and import into both files.

  const screenWidth = isLargerThan800 ? "350px" : "95vw"; // Found in login.tsx file. Make a constants file and import into both files.

  const validEmailInput = () => {
    if (!emailRegex.test(email)) setEmailError(true);
    console.log("Email regex", emailRegex.test(email));
  };

  const navigate = useNavigate();

  return (
    <Center>
      <Box w={screenWidth}>
        <Stack spacing={6}>
          <Text fontSize="2xl" fontWeight={600} textAlign="center">
            Forgot Password
          </Text>

          <FormControl variant="floating">
            <Text fontSize={"medium"} textAlign="left" marginBottom={2}>
              Give us your email and we'll send you a link
            </Text>
            <InputGroup>
              <Input
                aria-labelledby="email-label"
                id="email"
                name="email"
                placeholder="Email"
                isInvalid={emailError}
                value={email}
                h="40px"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormLabel id="email-label">Email</FormLabel>
            </InputGroup>
            {errorMessage ? (
              <FormHelperText fontSize="small" color="red">
                Input a valid email address.
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button onClick={validEmailInput}>Send Reset Password Link</Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default ForgotPasswordForm;
