import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../operations/axios';

export default function JoinGame() {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const joinGame = async () => {
    const tk = await instance.put('/game', {
      gameId: pin,
    });
    if (tk?.data) {
      navigate(`/game/${tk.data.value}`);
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
