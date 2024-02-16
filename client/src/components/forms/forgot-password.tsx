import React, { useState } from "react";
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
import axios from "axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [errorMessage] = useState<string>("");
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>("enterEmail");

  //const [isLargerThan550] = useMediaQuery("(min-width: 550px)"); // Found in login.tsx file. Make a constants file and import into both files.
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)"); // Found in login.tsx file. Make a constants file and import into both files.

  const screenWidth = isLargerThan800 ? "350px" : "95vw"; // Found in login.tsx file. Make a constants file and import into both files.

  // const validEmailInput = () => {
  //   if (!emailRegex.test(email)) setEmailError(true);
  //   console.log("Email regex", emailRegex.test(email));
  // };

  const handleEmailSubmission = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!emailRegex.test(email)) setEmailError(true);
    if (emailRegex.test(email)) {
      try {
        setIsLoading(true);
        const result = await axios.post(
          "http://localhost:2883/auth/reset-password",
          { email }
        );
        if (result) setIsLoading(false);
      } catch (error) {
        console.error("Error", error);
        setIsLoading(false);
      }
      setCurrentStep("showMessage");
    }
  };

  return (
    <Center>
      <Box w={screenWidth}>
        <Stack spacing={6}>
          <Text fontSize="2xl" fontWeight={600} textAlign="center">
            Forgot Password
          </Text>
          {currentStep === "enterEmail" && (
            <>
              <FormControl variant="floating">
                <Text fontSize={"medium"} textAlign="left" marginBottom={5}>
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
                    onChange={(e) => {
                      setEmailError(false);
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <FormLabel id="email-label">Email</FormLabel>
                </InputGroup>
                {emailError ? (
                  <FormHelperText fontSize="small" color="red">
                    Input a valid email address.
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Button
                onClick={handleEmailSubmission}
                isLoading={isLoading}
                loadingText="Submitting"
              >
                Send Reset Password Link
              </Button>
            </>
          )}
          {currentStep === "showMessage" && (
            <Text fontSize={"xl"} textAlign="center" marginBottom={5}>
              A password reset link was sent to your email.
            </Text>
          )}
        </Stack>
      </Box>
    </Center>
  );
};

export default ForgotPasswordForm;
