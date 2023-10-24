import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import instance from '../operations/axios';
import getAuth from '../operations/getAuth';

export default function CreateGame() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const createGame = async () => {
    setLoading(true);
    const id = await instance.post('/game', {}, {
      headers: {
        Authorization: getAuth(),
      },
    });
    if (id?.data) {
      navigate(`/game/${id.data.value}`);
    }
  };

  return (
    <Button isLoading={loading} onPress={() => createGame()}>
      Create a new game
    </Button>
  );
}
