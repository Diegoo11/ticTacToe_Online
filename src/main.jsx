import {
  ApolloClient, InMemoryCache, ApolloProvider, gql,
} from '@apollo/client';
import ReactDOM from 'react-dom/client';
import App from './App';
import './input.css';

const config = {
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
};
const client = new ApolloClient(config);

client.query({
  query: gql`
    query {
      getBooks {
        title
      }
    } 
  `,
}).then((res) => console.log(res));

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
