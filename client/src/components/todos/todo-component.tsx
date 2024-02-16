import {
  Card,
  CardHeader,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Collapse,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
const TodoComponent = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {/* <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" /> */}
            <Checkbox variant={"square"} />
            <Box>
              <Heading size="sm">Title of Note</Heading>
              <Text>Due Date</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />} // Description must also be present
            onClick={onToggle}
          />
        </Flex>
      </CardHeader>
      <Collapse in={isOpen} animateOpacity>
        <Text>Description of Todo goes here</Text>
      </Collapse>
    </Card>
  );
};

export default TodoComponent;
