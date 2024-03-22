import { BellIcon, SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const UserBioCard = () => {
  const data: any = useLoaderData();
  const user = data.get("user").data;
  const { id } = useParams();

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
      <Avatar size={"md"} />
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
      <Spacer />
      <Flex alignItems={"center"} mr={3}>
        <BellIcon fontSize={"xl"} mr={3} />
        <IconButton aria-label="Settings Icon Button" onClick={toSettings}>
          <SettingsIcon fontSize={"xl"} />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default UserBioCard;
