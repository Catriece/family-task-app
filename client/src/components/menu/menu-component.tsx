import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import { useModal } from "../../context/modal-context";

const MenuComponent = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { openModal } = useModal();

  const toSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/account/settings/${id}`);
  };

  return (
    <Menu>
      <MenuButton variant="ghost" as={Button}>
        <HamburgerIcon />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={toSettings}>Settings</MenuItem>
        <MenuItem onClick={openModal}>Create Todo</MenuItem>
        <MenuItem>Circle Members</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuComponent;
