import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import MenuComponent from "../menu/menu-component";

const HeaderComponent = () => {
  return (
    <Flex pt="20pt" pr="20pt" pl={"24pt"} w={"100%"} h={"100%"}>
      <Button pr={0} pl={0} variant="tertiary">
        <MenuComponent />
      </Button>
      <Heading as="h1" ml="8pt">
        SimplyDo
      </Heading>
    </Flex>
  );
};

export default HeaderComponent;
