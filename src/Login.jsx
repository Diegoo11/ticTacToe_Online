import {
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Login() {
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onOpenChange: onOpenChangeLogin,
  } = useDisclosure();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isLogged } = useUser();

  if (isLogged()) navigate('/play');

  const handlelogin = async (onClose) => {
    onClose();
    await login(username, password);
    navigate('/play');
  };

  useEffect(() => {
    onOpenLogin();
  }, []);
  return (
    <Modal
      isOpen={isOpenLogin}
      onOpenChange={onOpenChangeLogin}
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl">
              Login
            </ModalHeader>
            <ModalBody>
              <p>Por favor ingresa un nombre de usuario y contraseña</p>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                size="md"
                type="email"
                label="UserName"
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
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => { onClose(); navigate('/play'); }}
              >
                Exit
              </Button>
              <Button
                onPress={() => { onClose(); navigate('/play/register'); }}
              >
                Or Register
              </Button>
              <Button
                disabled={username.length === 0 || password === 0}
                onPress={() => handlelogin(onClose)}
              >
                Login
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
