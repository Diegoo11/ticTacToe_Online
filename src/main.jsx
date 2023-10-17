import {
  ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split,
} from '@apollo/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
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

const getAuth = () => {
  const token = localStorage.getItem('user-login-token');
  return token ? `bearer ${token}` : null;
};

const httpLink = new HttpLink({
  headers: { authorization: getAuth() },
  uri: import.meta.env.VITE_GRAPHQL_URL,
});

const wsLink = new GraphQLWsLink(createClient({
  url: import.meta.env.VITE_GRAPHQL_SUBS_URL,
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const config = {
  cache: new InMemoryCache(),
  link: splitLink,
};
const client = new ApolloClient(config);

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
  <ApolloProvider client={client}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </ApolloProvider>,
);
