import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Button,
} from '@nextui-org/react';
import { getTable } from './operations/query';
import Table from './Table';
import Icon from './Icon';
import ResetButton from './ResetButton';
import Login from './Login';

function App() {
  const {
    data, loading, error, refetch,
  } = useQuery(getTable);

  const [icon, setIcon] = useState('X');
  if (loading) return null;
  if (error) return (<h1>Oh no ocurrio un error, reportalo y vuelve despues.</h1>);
  return (
    <div className="flex flex-col justify-between w-screen h-screen bg-[#111926]">
      <nav className="w-full border-b-[#1b2533] border-b-2 text-white font-extrabold text-4xl lg:text-6xl text-center p-5">
        Tic-Tac-Toe-Online
      </nav>
      <main className="w-full flex flex-col justify-center items-center">
        <Table icon={icon} tableObj={data.getTable} />
        <Icon setIcon={setIcon} />
        <br />
        <Button onPress={() => refetch()} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
          Reload
        </Button>
        <ResetButton />
      </main>
      <footer className="w-full border-t-[#1b2533] border-t-2 text-white font-extrabold text-lg lg:text-2xl text-center p-5">
        Copyright © 2022 Diegoo11
        <Login />
      </footer>
    </div>
  );
}

export default App;
