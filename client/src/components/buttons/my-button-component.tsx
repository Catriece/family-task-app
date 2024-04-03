import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface Button {
  func: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonName: string;
  variant: string;
}

const ButtonComponent: FC<Button> = ({ variant, func, buttonName }) => {
  return (
    <Button variant={variant} w={"100%"} onClick={func}>
      {buttonName}
    </Button>
  );
};

export default ButtonComponent;
