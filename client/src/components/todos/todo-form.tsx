import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const TodoForm = ({}) => {
  return (
    <Modal isOpen={true} onClose={() => null} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title:</FormLabel>
            <Input />
          </FormControl>
          <FormLabel>Description:</FormLabel>
          <Textarea></Textarea>
        </ModalBody>
        <ModalFooter>
          <Button mr={2}>Close</Button>
          <Button>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TodoForm;
