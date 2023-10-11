import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@nextui-org/react';
import { useQuery } from '@apollo/client';
import UserProfile from './UserProfile';
import { useUser } from '../context/UserContext';
import interrogatorio from './assets/interrogatorio.svg';
import Table from './Table';
import { getEnemy } from './operations/query';
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

  if (loading || loadingQuery) return <CircularProgress aria-label="Loading..." />;
  if (!user) navigate('/play');
  return (
    <div className="flex flex-col md:flex-row">
      <UserProfile
        src={user.imgSrc}
        username={user.username}
      />
      <span className="text-white">
        <Table />
        <InvitationLink gameId={gameId} />
      </span>
      <UserProfile
        src={data?.getEnemy?.imgSrc || interrogatorio}
        username={data?.getEnemy?.username || 'Not authenticated'}
      />
    </div>
  );
}
