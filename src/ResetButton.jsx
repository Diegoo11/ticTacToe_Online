import { Button } from '@nextui-org/react';
import { useMutation } from '@apollo/client';
import { resetTable } from './operations/mutation';

export default function ResetButton() {
  const [resetTablero, { loading }] = useMutation(resetTable);
  return (
    <Button
      className="shadow-lg absolute bottom-4 right-4"
      isLoading={loading}
      onPress={() => resetTablero({ variables: { gameId: 1 } })}
    >
      Reset
    </Button>
  );
}
