import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import instance from './operations/axios';
import getAuth from './operations/getAuth';

export default function JoinGameLink() {
  const { joinId } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate('/play/login');
      const join = async () => {
        const tk = await instance.put('/game', {
          gameId: joinId,
        }, {
          headers: {
            Authorization: getAuth(),
          },
        });
        if (tk?.data) {
          navigate(`/game/${tk.data.value}`);
        }
      };
      join();
    }
  }, [loading]);
}
