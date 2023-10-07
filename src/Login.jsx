import {
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input,
} from '@nextui-org/react';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userName, setUserName] = useState('');

  const { user } = useUser();

  const login = (onClose) => {
    console.log('Login', { userName });
    onClose();
  };
  return (
    <>
      <Button onPress={onOpen}>Login</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">
                Login
              </ModalHeader>
              <ModalBody>
                <p>Por favor ingresa un nombre de usuario</p>
                <Input
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  size="md"
                  type="email"
                  label="UserName"
                  maxLength={100}
                />
              </ModalBody>
              <ModalFooter>
                <Button disabled={userName.length === 0} onPress={() => login(onClose)}>
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
