import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import MenuComponent from "../menu/menu-component";
import { FC } from "react";

interface SimplyDoHeading {
  ptop?: string;
  pright?: string;
  pleft?: string;
  width?: string;
  height?: string;
  mleft?: string;
  fontSize: string;
}

const HeaderComponent: FC<SimplyDoHeading> = ({
  ptop,
  pright,
  pleft,
  width,
  height,
  mleft,
  fontSize,
}) => {
  return (
    <Flex pt={ptop} pr={pright} pl={pleft} w={width} h={height}>
      <Heading as="h1" ml={mleft} fontSize={fontSize}>
        SimplyDo
      </Heading>
    </Flex>
  );
};

export default HeaderComponent;
