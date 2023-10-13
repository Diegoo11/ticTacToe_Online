import { Outlet } from 'react-router-dom';

function App({ children }) {
  // const {
  //  data, loading, error, refetch,
  // } = useQuery(getTable);

  // const [icon, setIcon] = useState('X');
  // if (loading) return null;
  // if (error) return (<h1>Oh no ocurrio un error, reportalo y vuelve despues.</h1>);

  /*
            <Home />
        <br />
        <Button onPress={() => refetch()}>
          Reload
        </Button>
        <ResetButton />
  */
  return (
    <div className="w-full flex flex-col justify-between h-full bg-[#111926] min-h-screen">
      <nav className="border-b-[#1b2533] border-b-2 text-white font-extrabold text-4xl lg:text-6xl text-center p-5">
        Tic-Tac-Toe-Online
      </nav>
      <main className="w-full flex flex-col justify-center items-center">
        <Outlet />
        {children}
      </main>
      <footer className="w-full border-t-[#1b2533] border-t-2 text-white font-semibold text-base md:text-md lg:text-xl text-center p-1 md:p-5">
        Copyright © 2023 Diegoo11
      </footer>
    </div>
  );
}

export default App;
