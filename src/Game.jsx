import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@nextui-org/react';
import { useQuery } from '@apollo/client';
import UserProfile from './UserProfile';
import { useUser } from '../context/UserContext';
import interrogatorio from './assets/interrogatorio.svg';
import Table from './Table';
import { getEnemy, getTurn } from './operations/query';
import InvitationLink from './InvitationLink';

export default function Game() {
  const { gameId } = useParams();
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const { loading: loadingQuery, data } = useQuery(getEnemy, {
    variables: {
      gameId,
    },
  });
  const {
    loading: loadingTurn,
    data: dataTurn,
    refetch: refetchTurn,
  } = useQuery(getTurn, {
    variables: { gameId },
  });

  if (loading || loadingQuery || loadingTurn) return <CircularProgress aria-label="Loading..." />;
  if (!user) navigate('/play');
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row m-2">
        <UserProfile
          src={user.imgSrc}
          username={user.username}
          turn={user.id === dataTurn.getTurn.id}
        />
        <span className="text-white">
          <Table refetchTurn={refetchTurn} />
        </span>
        <UserProfile
          src={data?.getEnemy?.imgSrc || interrogatorio}
          username={data?.getEnemy?.username || 'Not authenticated'}
          turn={data?.getEnemy?.id === dataTurn.getTurn.id}
        />
      </div>
      <InvitationLink gameId={gameId} />
    </div>
  );
}
