/* eslint-disable react/jsx-no-constructed-context-values */
import { useApolloClient, useQuery } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const { loading, data, error } = useQuery(getUser);

  if (error) toast('Error de login');

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
        location.replace('/play');
      }
    } catch (err) {
      toast.error('Usuario o contraseña erronea');
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
        location.replace('/play');
      }
    } catch (err) {
      toast.error('Error al prosesar la solicitud');
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
      <ToastContainer
        theme="dark"
      />
    </userContext.Provider>
  );
}
