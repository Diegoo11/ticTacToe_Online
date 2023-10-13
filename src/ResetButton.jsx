import { Button } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { resetTable } from './operations/mutation';

export default function ResetButton() {
  const { gameId } = useParams();
  const [resetTablero, { loading }] = useMutation(resetTable);
  return (
    <Button
      isLoading={loading}
      onPress={() => resetTablero({ variables: { gameId } })}
    >
      Reset
    </Button>
  );
}
