import { Button } from '@nextui-org/react';
import { useMutation } from '@apollo/client';
import { resetTable } from './operations/mutation';

export default function ResetButton() {
  const [resetTablero, { loading }] = useMutation(resetTable);
  return (
    <Button
      className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg
      absolute bottom-4 right-4 text-xl"
      isLoading={loading}
      onPress={() => resetTablero({ variables: { gameId: 1 } })}
    >
      Reset
    </Button>
  );
}
