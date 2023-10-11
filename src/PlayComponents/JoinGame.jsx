import { useApolloClient } from '@apollo/client';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JOINGAME } from '../operations/mutation';

export default function JoinGame() {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const client = useApolloClient();

  const joinGame = async () => {
    const tk = await client.mutate({
      mutation: JOINGAME,
      variables: {
        gameId: pin,
      },
    });
    if (tk?.data) {
      navigate(`/game/${tk.data.joinGame.value}`);
    }
  };
  return (
    <div className="flex gap-2">
      <Input
        onChange={(e) => setPin(e.target.value)}
        value={pin}
        size="md"
        type="text"
        labelPlacement="outside"
        maxLength={100}
        required
      />
      <Button onPress={() => joinGame()}>
        Play
      </Button>
    </div>
  );
}
