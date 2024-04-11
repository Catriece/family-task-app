import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  HStack,
} from "@chakra-ui/react";
import { FC } from "react";

interface ModalProps {
  buttonName: string;
  title: string;
  content: React.ReactNode;
  variant: string;
  fontSize: string;
  padding: string;
  func: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyModal: FC<ModalProps> = ({
  buttonName,
  title,
  content,
  variant,
  fontSize,
  padding,
  func,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant={variant}
        fontSize={fontSize}
        onClick={onOpen}
        padding={padding}
      >
        {buttonName}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{content}</ModalBody>

          <ModalFooter>
            <HStack>
              <Button
                variant="primary"
                size="md"
                fontSize="md"
                h="24pt"
                onClick={func}
              >
                Submit
              </Button>
              <Button
                size="sm"
                variant="secondary"
                colorScheme="blue"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModal;
