import { SearchIcon } from "@chakra-ui/icons";
import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
} from "@chakra-ui/react";
import { DARKVARIATION, MD, MEDIUMVARIATION } from "../styles";

const SearchBarComponent = () => {
  return (
    <Flex w={"100%"} justifyContent={"center"}>
      <Stack spacing={4} w={"90%"}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color={MEDIUMVARIATION} />
          </InputLeftElement>
          <Input
            borderColor={DARKVARIATION}
            color={DARKVARIATION}
            borderRadius={MD}
            type="text"
            placeholder="Search Todos"
          />
        </InputGroup>
      </Stack>
    </Flex>
  );
};

export default SearchBarComponent;
