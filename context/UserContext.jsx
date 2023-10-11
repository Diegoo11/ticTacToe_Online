/* eslint-disable react/jsx-no-constructed-context-values */
import { useApolloClient, useQuery } from '@apollo/client';
import {
  useContext, createContext,
} from 'react';
import { getUser } from '../src/operations/query';
import { LOGIN, REGISTER } from '../src/operations/mutation';

const userContext = createContext();

export const useUser = () => {
  const contex = useContext(userContext);
  if (!useContext) throw new Error('contect not found');
  return contex;
};

export function UserProvider({ children }) {
  const client = useApolloClient();
  const { loading, data } = useQuery(getUser);

  const isLogged = () => !!data?.getUser;

  const login = async (username, password) => {
    try {
      const tk = await client.mutate({
        mutation: LOGIN,
        variables: {
          username,
          password,
        },
      });
      if (tk?.data) {
        localStorage.setItem('user-login-token', tk.data.login.value);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const register = async (username, password) => {
    try {
      const tk = await client.mutate({
        mutation: REGISTER,
        variables: {
          username,
          password,
        },
      });
      if (tk?.data) {
        localStorage.setItem('user-login-token', tk.data.register.value);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const logout = () => {
    localStorage.removeItem('user-login-token');
    client.clearStore();
    location.reload();
  };

  return (
    <userContext.Provider
      value={{
        user: data?.getUser,
        loading,
        isLogged,
        login,
        logout,
        register,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
