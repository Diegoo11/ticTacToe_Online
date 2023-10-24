import { v4 as uuidv4 } from 'uuid';
import { Button, CircularProgress } from '@nextui-org/react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useQuery, useQueryClient, QueryCache,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import EndGame from './EndGame';
import ResetButton from './ResetButton';
import instance from './operations/axios';
import { useUser } from '../context/UserContext';
import getAuth from './operations/getAuth';

const icons = {
  0: ' ',
  1: 'X',
  2: 'O',
};

function Table({
  changeTurn, ico, setTurn, turn,
}) {
  const client = useQueryClient();
  const queryCache = new QueryCache({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onSettled: (data, error) => {
      console.log(data, error);
    },
  });
  const navigate = useNavigate();
  const { gameId } = useParams();
  const { socket, user } = useUser();
  const [table, setTable] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [winner, setWinner] = useState(0);

  const {
    isPending: loadingQu, data: dataQu, error,
  } = useQuery({
    queryKey: ['getTable'],
    queryFn: () => instance.get('/table', {
      params: {
        gameId,
      },
      headers: {
        Authorization: getAuth(),
      },
    }).then((res) => res.data),
  });

  useEffect(() => {
    socket.on('played', (res) => {
      setTable([
        [res.table.p_0, res.table.p_1, res.table.p_2],
        [res.table.p_3, res.table.p_4, res.table.p_5],
        [res.table.p_6, res.table.p_7, res.table.p_8],
      ]);
      setTurn(res.table.status === ico);
      setWinner(res.table.winner);
    });
  });
  useEffect(() => {
    if (dataQu) {
      const tableObj = dataQu.table;

      setTable([
        [tableObj.p_0, tableObj.p_1, tableObj.p_2],
        [tableObj.p_3, tableObj.p_4, tableObj.p_5],
        [tableObj.p_6, tableObj.p_7, tableObj.p_8],
      ]);
      setTurn(dataQu.table.status === ico);
      setWinner(dataQu.table.winner);
    }
  }, [dataQu?.table]);

  if (loadingQu) return <CircularProgress aria-label="Loading..." />;
  if (error) throw new Error(error.message);

  const tableObj = dataQu.table;

  const playedClick = (x, y) => {
    if (!turn) return;
    const newTable = [...table];
    if (newTable[x][y] !== 0) return;
    newTable[x][y] = ico;
    setTable([...newTable]);
    socket.emit('playerPlayed', { gameId, play: (3 * x + y), userId: user._id });
    changeTurn();
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
                className="bg-[#191919] h-20 w-20 text-3xl md:h-32 md:w-32 sm:text-5xl font-bold text-white"
              >
                {icons[btn]}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <ResetButton />
        <Button onPress={() => {
          navigate('/play');
          client.clear();
          queryCache.clear();
        }}
        >
          Exit

        </Button>
      </div>
      {winner !== 0 && <EndGame winner={winner} /> }
    </div>
  );
}

export default Table;
