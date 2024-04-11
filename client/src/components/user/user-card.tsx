import { BellIcon, SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import mediaQueries from "../constants";

const UserBioCard = () => {
  const data: any = useLoaderData();
  const user = data.get("user").data;
  const { id } = useParams();
  const { ISLARGERTHAN750 } = mediaQueries();

  const currentHour = dayjs().hour();

  const navigate = useNavigate();

  const toSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/account/settings/${id}`);
  };

  return (
    <Flex
      padding=" 0 16pt"
      justifyContent={"center"}
      alignItems={"center"}
      //w={"100%"}
    >
      {ISLARGERTHAN750 ? null : <Avatar size={"md"} />}
      <Flex flexDirection={"column"} ml={2} justifyContent={"center"}>
        <Text fontSize="md" lineHeight={"1.5rem"}>
          {currentHour > 5 && currentHour < 12
            ? "Good Morning,"
            : currentHour >= 12 && currentHour < 18
            ? "Good Afternoon,"
            : "Good Evening,"}
        </Text>
        <Text fontSize="lg" fontWeight={800}>
          {`${user.firstName} ${user.lastName}`}
        </Text>
      </Flex>
      {ISLARGERTHAN750 ? null : (
        <>
          <Spacer />
          <Flex alignItems={"flex-end"} mr={3}>
            <IconButton
              variant="unstyled"
              aria-label="Settings Icon Button"
              onClick={toSettings}
            >
              <SettingsIcon fontSize={"2xl"} />
            </IconButton>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default UserBioCard;
