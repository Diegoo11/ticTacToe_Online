import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { JOINGAME } from './operations/mutation';
import { useUser } from '../context/UserContext';

export default function JoinGameLink() {
  const client = useApolloClient();
  const { joinId } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate('/play/login');
      const join = async () => {
        const tk = await client.mutate({
          mutation: JOINGAME,
          variables: {
            gameId: joinId,
          },
        });
        if (tk?.data) {
          navigate(`/game/${tk.data.joinGame.value}`);
        }
      };
      join();
    }
  }, [loading]);
}
