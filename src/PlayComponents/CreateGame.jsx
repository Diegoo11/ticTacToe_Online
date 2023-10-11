import { useApolloClient } from '@apollo/client';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CREATEGAME } from '../operations/mutation';

export default function CreateGame() {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const navigate = useNavigate();
  const createGame = async () => {
    setLoading(true);
    const id = await client.mutate({ mutation: CREATEGAME });
    if (id?.data) {
      navigate(`/game/${id.data.createGame.value}`);
    }
  };

  return (
    <Button isLoading={loading} onPress={() => createGame()}>
      Create a new game
    </Button>
  );
}
