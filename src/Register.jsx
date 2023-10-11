import {
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Login() {
  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onOpenChange: onOpenChangeRegister,
  } = useDisclosure();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const { register, isLogged } = useUser();
  const navigate = useNavigate();

  if (isLogged()) navigate('/play');

  const handleRegister = async (onClose) => {
    onClose();
    await register(username, password);
    location.replace('/play');
  };

  useEffect(() => {
    onOpenRegister();
  }, []);
  return (
    <Modal
      isOpen={isOpenRegister}
      onOpenChange={onOpenChangeRegister}
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl">
              Register
            </ModalHeader>
            <ModalBody>
              <p>Bienvenido ingrese sus datos</p>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                size="md"
                type="email"
                label="Username"
                maxLength={100}
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                size="md"
                type="password"
                label="Password"
                maxLength={100}
                isRequired
              />
              <Input
                onChange={(e) => setPasswordAgain(e.target.value)}
                value={passwordAgain}
                size="md"
                type="password"
                label="Password again"
                maxLength={100}
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => { onClose(); navigate('/play'); }}
              >
                Exit
              </Button>
              <Button
                onPress={() => { onClose(); navigate('/play/login'); }}
              >
                Or Login
              </Button>
              <Button
                disabled={username.length === 0 || password === 0 || password !== passwordAgain}
                onPress={() => handleRegister(onClose)}
              >
                Register
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
