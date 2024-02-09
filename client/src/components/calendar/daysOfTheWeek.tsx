import {
  Container,
  Card,
  Box,
  Flex,
  Center,
  Text,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import React from "react";
import dayjs from "dayjs";

const dotw = [
  {
    day: "S",
  },
  {
    day: "M",
  },
  {
    day: "T",
  },
  {
    day: "W",
  },
  {
    day: "T",
  },
  {
    day: "F",
  },
  {
    day: "S",
  },
];

const boxStyle = {
  border: ".5px solid black",
  width: "12%",
  height: "50%",
  //   borderRadius: "50%",
  backgroundColor: "#f9f9f9",
};

const DaysOfTheWeek = () => {
  return (
    <Center>
      <Container w="100vw" h="95px" border="1px solid black">
        <Flex h="inherit" justifyContent="space-around">
          {dotw &&
            dotw.map((day, index) => {
              return (
                <Card w="14%" h="70%">
                  <CardHeader p="0">{day.day}</CardHeader>
                  <CardBody p="0">{dayjs().format("D")}</CardBody>
                </Card>
              );
            })}
        </Flex>
      </Container>
    </Center>
  );
};

export default DaysOfTheWeek;
