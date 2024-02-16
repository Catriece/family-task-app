import { Button } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <Button
      isLoading
      colorScheme="blue"
      width="90vw"
      variant="ghost"
      spinner={<BeatLoader size={20} color="black" />}
    />
  );
};

export default Loader;
