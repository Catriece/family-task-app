import { Box, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";

const boxStyle = {
  width: "25%",
  height: "90%",
  marginRight: 1,
  marginLeft: 1,
  border: "solid black .5px",
  backgroundColor: "white",
};
const WeeklyCalendarComponent = () => {
  const today = dayjs().day();

  return (
    <Flex w={"100%"} h={"100%"} alignItems={"center"} overflow={"scroll"}>
      <Flex sx={boxStyle}>{today}</Flex>
      <Flex sx={boxStyle}></Flex>
      <Flex sx={boxStyle}></Flex>
      <Flex sx={boxStyle}></Flex>
      <Flex sx={boxStyle}></Flex>
      <Flex sx={boxStyle}></Flex>
      <Flex sx={boxStyle}></Flex>
    </Flex>
  );
};

export default WeeklyCalendarComponent;
