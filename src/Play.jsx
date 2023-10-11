import { Button } from '@nextui-org/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import interrogatorio from './assets/interrogatorio.svg';
import UserProfile from './UserProfile';
import CreateGame from './PlayComponents/CreateGame';
import JoinGame from './PlayComponents/JoinGame';

export default function Play() {
  const navigate = useNavigate();
  const { logout, isLogged } = useUser();
  let { user } = useUser();
  if (!user) {
    user = {
      imgSrc: interrogatorio,
      username: 'Not authenticated',
    };
  }

  return (
    <>
      <UserProfile
        src={user.imgSrc}
        username={user.username}
      />
      {
        isLogged() ? (
          <div className="flex flex-col gap-4">
            <Button onPress={() => logout()}>
              LogOut
            </Button>
            <div className="flex flex-col gap-2">
              <span className="text-gray-300">
                Crear una nueva partida:
              </span>
              <CreateGame />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-300">
                Ingresa el codigo de partida:
              </span>
              <JoinGame />
            </div>
          </div>
        ) : (
          <Button onPress={() => navigate('/play/login')}>
            Play
          </Button>
        )
      }
      <Outlet />
    </>
  );
}
