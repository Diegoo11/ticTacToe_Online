import { Input } from '@nextui-org/react';
import { useState } from 'react';
import UserProfile from './UserProfile';
// import { useUser } from '../context/UserContext';

export default function Home() {
  // const { user } = useUser();

  const [pin, setPin] = useState('');
  return (
    <div className="m-12">
      <UserProfile />
      <div>
        <span className="text-gray-300">Ingresa el codigo de partida: </span>
        <Input
          onChange={(e) => setPin(e.target.value)}
          value={pin}
          size="md"
          type="number"
          labelPlacement="outside"
          maxLength={100}
          classNames={{
            input: [
              'bg-[#161e2b]',
            ],
          }}
        />
      </div>
    </div>
  );
}
