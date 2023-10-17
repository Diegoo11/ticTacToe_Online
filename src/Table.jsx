import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { Button, CircularProgress } from '@nextui-org/react';
import { useNavigate, useParams } from 'react-router-dom';
import { played } from './operations/mutation';
import { getTable } from './operations/query';
import EndGame from './EndGame';
import ResetButton from './ResetButton';
import { playerPlayed } from './operations/subscription';

const icons = {
  0: ' ',
  1: 'X',
  2: 'O',
};

function Table({ refetchTurn }) {
  const { gameId } = useParams();
  const [updatePlayed] = useMutation(played);
  const navigate = useNavigate();
  const {
    loading: loadingQu, data: dataQu, refetch, error,
  } = useQuery(getTable, { variables: { gameId } });

  useSubscription(playerPlayed, {
    variables: { gameId },
    onSubscriptionData: () => { refetch(); refetchTurn(); },
  });

  if (loadingQu) return <CircularProgress aria-label="Loading..." />;
  if (error) throw new Error(error.message);

  const tableObj = dataQu.getTable;

  const table = [
    [
      tableObj.p_0,
      tableObj.p_1,
      tableObj.p_2,
    ],
    [
      tableObj.p_3,
      tableObj.p_4,
      tableObj.p_5,
    ],
    [
      tableObj.p_6,
      tableObj.p_7,
      tableObj.p_8,
    ],
  ];

  const playedClick = (x, y) => {
    updatePlayed({
      variables: {
        play: (3 * x + y),
        gameId,
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col gap-3 justify-between bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 h-64 w-60 md:h-96 md:w-96 m-10">
        {table.map((row, i) => (
          <div className="flex gap-3 justify-between" key={uuidv4()}>
            {row.map((btn, j) => (
              <button
                type="button"
                disabled={btn !== 0 || tableObj.winner === 1}
                onClick={() => playedClick(i, j)}
                key={uuidv4()}
                className="bg-[#111926] h-20 w-20 text-3xl md:h-32 md:w-32 sm:text-5xl font-bold text-white"
              >
                {icons[btn]}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <ResetButton />
        <Button onPress={() => { navigate('/play'); }}>Exit</Button>
      </div>
      {tableObj.winner !== 0 && <EndGame winner={tableObj.winner} />}
    </div>
  );
}

export default Table;
