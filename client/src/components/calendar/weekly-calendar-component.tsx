import { Box, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import mediaQueries from "../constants";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { DARKVARIATION, LIGHTESTVARIATION, MEDIUMVARIATION } from "../styles";

const WeeklyCalendarComponent = () => {
  const { ISLARGERTHAN750 } = mediaQueries();
  const today = dayjs().day(); // current day

  const week = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      bg={LIGHTESTVARIATION}
      alignItems={"center"}
      flexDirection={ISLARGERTHAN750 ? "column" : "row"}
      justifyContent={"space-around"}
      border={`solid ${DARKVARIATION} .5pt`}
      borderRadius={"16pt"}
    >
      {week.map((day, index) => {
        const findWeekDay = index - today;

        let date;

        findWeekDay >= 0
          ? (date = dayjs().add(findWeekDay, "day").date())
          : (date = dayjs()
              .subtract(findWeekDay * -1, "day")
              .date());

        return (
          <Flex
            key={index}
            h={"100%"}
            w={"14%"}
            p={2}
            bg={ISLARGERTHAN750 ? "" : findWeekDay === 0 ? MEDIUMVARIATION : ""}
            flexDirection={"column"}
            alignItems={"center"}
            borderRadius={
              ISLARGERTHAN750
                ? ""
                : index === 0
                ? "16pt 0 0 16pt"
                : index === 6
                ? "0 16pt 16pt 0"
                : ""
            }
          >
            <Box>
              <Text fontSize={"md"}>{day}</Text>
            </Box>

            <Flex justifyContent={"center"}>
              <Text fontSize={"16pt"}>{date}</Text>
            </Flex>
            {findWeekDay === 0 && (
              <Flex justifyContent={"center"}>
                {dayjs().hour() > 18 || dayjs().hour() < 6 ? (
                  <MoonIcon fontSize={"sm"} />
                ) : (
                  <SunIcon fontSize={"sm"} fontWeight={800} />
                )}
              </Flex>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default WeeklyCalendarComponent;
