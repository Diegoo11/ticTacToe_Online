import { Button } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import instance from './operations/axios';
import { useUser } from '../context/UserContext';
import getAuth from './operations/getAuth';

export default function ResetButton() {
  const { gameId } = useParams();
  const { socket } = useUser();
  const { mutate, loading } = useMutation({
    mutationKey: ['resetTable'],
    mutationFn: (ctx) => instance.put('/table/reset', ctx, {
      headers: {
        Authorization: getAuth(),
      },
    }),
  });

  const handdleReset = () => {
    mutate({ gameId });
    socket.emit('playerPlayed', { gameId });
  };
  return (
    <Button
      isLoading={loading}
      onPress={handdleReset}
    >
      Reset
    </Button>
  );
}
