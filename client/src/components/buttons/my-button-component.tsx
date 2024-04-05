import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface Button {
  func: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonName: string;
  variant: string;
  width?: string;
}

const ButtonComponent: FC<Button> = ({ variant, func, buttonName, width }) => {
  return (
    <Button variant={variant} w={width} onClick={func}>
      {buttonName}
    </Button>
  );
};

export default ButtonComponent;
