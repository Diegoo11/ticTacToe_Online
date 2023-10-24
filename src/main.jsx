import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './input.css';
import { UserProvider } from '../context/UserContext';
import Login from './Login';
import Register from './Register';
import Play from './Play';
import Game from './Game';
import ErrorPageGame from './ErrorPageGame';
import Redirect from './Redirec';
import JoinGameLink from './JoinGameLink';

/*
const getAuth = () => {
  const token = localStorage.getItem('user-login-token');
  return token ? `bearer ${token}` : null;
};
*/

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Redirect />,
      },
      {
        path: '/join/:joinId',
        element: <JoinGameLink />,
      },
      {
        path: 'play',
        element: <Play />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
      {
        path: 'game/:gameId',
        element: <Game />,
      },
    ],
    errorElement: <App><ErrorPageGame /></App>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </QueryClientProvider>,
);
