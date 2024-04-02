import {
  Avatar,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import { useModal } from "../../context/modal/modal-context";
import MenuComponent from "../menu/menu-component";

const TopNavigationBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { openModal } = useModal();

  const toSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/account/settings/${id}`);
  };

  return (
    <Flex
      as="nav"
      pt="20pt"
      pl="20pt"
      pr={"32pt"}
      w="100%"
      alignItems="center"
      justifyContent={"flex-end"}
    >
      <HStack spacing="20pt">
        <Button onClick={openModal} variant="primary">
          Create Task
        </Button>
        <Button onClick={logout} variant="secondary">
          Logout
        </Button>
        <Avatar onClick={toSettings} />
      </HStack>
    </Flex>
  );
};

export default TopNavigationBar;
