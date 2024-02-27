import { Flex, Text } from "@chakra-ui/react";

const HeaderComponent = () => {
  return (
    <Flex p={3} w={"100%"} h={"100%"}>
      <Text fontSize={"xl"} fontWeight={700} color="black">
        Family Task App{" "}
      </Text>
    </Flex>
  );
};

export default HeaderComponent;
