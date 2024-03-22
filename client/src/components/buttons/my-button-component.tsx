import { Button } from "@chakra-ui/react";
import { PRIMARYCOLOR, WHITE } from "../styles";
import { FC } from "react";

interface Button {
  func: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonName: string;
}

const ButtonComponent: FC<Button> = ({ func, buttonName }) => {
  return (
    <Button w={"100%"} bgColor={PRIMARYCOLOR} color={WHITE} onClick={func}>
      {buttonName}
    </Button>
  );
};

export default ButtonComponent;
