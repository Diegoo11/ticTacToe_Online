/* eslint-disable no-underscore-dangle */
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
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

  const { isPending: loadingQuery, data, refetch } = useQuery({
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

  const {
    isPending: loadingTurn,
    data: dataTurn,
    refetch: refetchTurn,
  } = useQuery({
    queryKey: ['getTurn'],
    queryFn: () => instance.get('table/turn', {
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
    socket.on('joinPlayer', () => {
      refetch();
    });
  }, [loading]);

  if (loading || loadingQuery || loadingTurn) return <CircularProgress aria-label="Loading..." />;
  if (!user) navigate('/play');

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row m-2">
        <UserProfile
          src={user.imgSrc}
          username={user.username}
          turn={user._id === dataTurn.id}
        />
        <span className="text-white">
          <Table refetchTurn={refetchTurn} />
        </span>
        <UserProfile
          src={data?.enemy?.imgSrc || interrogatorio}
          username={data?.enemy?.username || 'Not authenticated'}
          turn={data?.enemy?._id === dataTurn.id}
        />
      </div>
      <InvitationLink gameId={gameId} />
    </div>
  );
}
