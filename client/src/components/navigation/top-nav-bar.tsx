import { Button, Flex, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import { useModal } from "../../context/modal/modal-context";
import mediaQueries from "../constants";
import HeaderComponent from "../header/header";
import { AddIcon, SettingsIcon } from "@chakra-ui/icons";

const TopNavigationBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { openModal } = useModal();

  const toSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/account/settings/${id}`);
  };

  const { ISLARGERTHAN750 } = mediaQueries();

  return (
    <>
      {ISLARGERTHAN750 ? (
        <Flex
          as="nav"
          pt="20pt"
          pl="20pt"
          pr={"32pt"}
          w="100%"
          alignItems="center"
          justifyContent={"flex-end"}
        >
          <HStack spacing="8pt">
            <Button onClick={openModal} variant="primary">
              Create Task
            </Button>
            <Button onClick={logout} variant="secondary">
              Logout
            </Button>
            {/* <Avatar onClick={toSettings} /> */}
            <IconButton
              aria-label="Settings"
              icon={<SettingsIcon />}
              onClick={toSettings}
              variant="tertiary"
              fontSize="2xl"
            />
          </HStack>
        </Flex>
      ) : (
        <Flex
          as="nav"
          pt="10pt"
          pl="10pt"
          pr="10pt"
          w="100%"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Flex>
            <HeaderComponent
              ptop={"4pt"}
              pright={"4pt"}
              pleft={"0pt"}
              width={"100%"}
              height={"100%"}
              mleft={"0pt"}
              fontSize="2xl"
            />
          </Flex>
          <HStack spacing="5pt">
            <Tooltip label="Create New Task" aria-labelledby="New-Task-Btn">
              <IconButton
                id="New-Task-Btn"
                aria-label="Create New Task"
                onClick={openModal}
                variant="primary"
                size="md"
                padding={1}
                icon={<AddIcon fontSize={"xs"} />}
              />
            </Tooltip>

            <Button onClick={logout} variant="ghost" size={"xs"}>
              Logout
            </Button>
          </HStack>
        </Flex>
      )}
    </>
  );
};

export default TopNavigationBar;
