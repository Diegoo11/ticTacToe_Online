import { Button } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ResetButton({ setTable, setWinner }) {
  const { gameId } = useParams();
  const { socket, user } = useUser();

  const handdleReset = () => {
    socket.emit('reset', { gameId, userId: user._id });
    setTable([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    setWinner(0);
  };
  return (
    <Button
      onPress={handdleReset}
    >
      Reset
    </Button>
  );
}
