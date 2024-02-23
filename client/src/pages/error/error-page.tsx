import { Card, Center, Text } from "@chakra-ui/react";
import mediaQueries from "../../components/constants";

const ErrorPage = () => {
  const { ISLARGERTHAN550 } = mediaQueries();

  let screenWidth = ISLARGERTHAN550 ? "80vw" : "100cw";
  return (
    <Card width={screenWidth} padding="20px">
      <Text textAlign="center">
        "Oops! It seems you've stumbled upon a locked door. 🔒
      </Text>
      <br />
      <Text textAlign="center">
        This area is reserved for authorized family members only. If you believe
        you've reached this page by mistake, make sure you{" "}
        <a href="/login">login</a>.
      </Text>
      <Text textAlign="center">Thanks for your understanding! 🚪"</Text>
    </Card>
  );
};

export default ErrorPage;
