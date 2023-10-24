/* eslint-disable no-underscore-dangle */
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import { useUser } from '../context/UserContext';
import interrogatorio from './assets/interrogatorio.svg';
import Table from './Table';
import InvitationLink from './InvitationLink';
import instance from './operations/axios';
import getAuth from './operations/getAuth';

export default function Game() {
  const { gameId } = useParams();
  const { user, loading, socket } = useUser();
  const navigate = useNavigate();
  const [turn, setTurn] = useState(11);
  const [enemy, setEnemy] = useState({
    imgSrc: interrogatorio,
    username: 'Not authenticated',
  });

  const { isPending: loadingQuery, data } = useQuery({
    queryKey: ['getEnemy'],
    queryFn: () => instance.get('/table/enemy', {
      headers: {
        Authorization: getAuth(),
      },
      params: {
        gameId,
      },
    }).then((res) => res.data),
  });

  useEffect(() => {
    if (!loading) {
      socket.emit('conectGame', { userId: user._id, gameId });
    }
    socket.on('joinPlayer', (res) => {
      if (res.player1._id !== user._id) {
        setEnemy(res.player1);
      } else if (res?.player2) {
        setEnemy(res.player2);
      }
    });
  }, [loading]);

  if (loading || loadingQuery) return <CircularProgress aria-label="Loading..." />;
  if (!user) navigate('/play');

  const changeTurn = () => setTurn((t) => !t);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row m-2">
        <UserProfile
          src={user.imgSrc}
          username={user.username}
          turn={turn}
        />
        <span className="text-white">
          <Table changeTurn={changeTurn} ico={data.currentIco} setTurn={setTurn} turn={turn} />
        </span>
        <UserProfile
          src={enemy.imgSrc}
          username={enemy.username}
          turn={!turn}
        />
      </div>
      <InvitationLink gameId={gameId} />
    </div>
  );
}
