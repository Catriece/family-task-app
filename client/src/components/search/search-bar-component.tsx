import { SearchIcon } from "@chakra-ui/icons";
import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
} from "@chakra-ui/react";

const SearchBarComponent = () => {
  return (
    <Flex w={"100%"} justifyContent={"center"}>
      <Stack spacing={4} w={"90%"}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input borderRadius={"20"} type="text" placeholder="Search Todos" />
        </InputGroup>
      </Stack>
    </Flex>
  );
};

export default SearchBarComponent;
