import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import error from './assets/error.svg';

export default function ErrorPageGame() {
  const navigate = useNavigate();

  return (
    <div className="mb-8 w-40 md:w-60 flex flex-col justify-center items-center gap-6">
      <img
        className="bg-[#161e2b] rounded-md p-4"
        src={error}
        alt="error"
      />
      <span className="text-gray-300 font-semibold text-lg text-center flex items-center">
        Play code not found, please create a new game
      </span>
      <Button onPress={() => navigate('/play')}>
        Home
      </Button>
    </div>
  );
}
