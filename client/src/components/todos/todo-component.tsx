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
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
const TodoComponent = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Card maxW="md">
      <CardHeader p={3} pb={0}>
        <Flex flexDirection={"column"}>
          <Flex justifyContent={"space-between"}>
            <Text>Priority Level</Text>
            <Checkbox variant={"square"} />
          </Flex>
          <Box>
            <Heading size="md" pl={3}>
              Title of Note
            </Heading>
          </Box>
          <Flex justifyContent={"space-between"}>
            <Tooltip label="See task description">
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />} // Description must also be present
                onClick={onToggle}
              />
            </Tooltip>
            <Text>Due Date</Text>
          </Flex>
        </Flex>
      </CardHeader>
      <Collapse in={isOpen} animateOpacity>
        <Text pb={4} pl={5}>
          Description of Todo goes here
        </Text>
      </Collapse>
    </Card>
  );
};

export default TodoComponent;
