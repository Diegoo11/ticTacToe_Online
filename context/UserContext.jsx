/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useContext, createContext,
} from 'react';
import io from 'socket.io-client';
import instance from '../src/operations/axios';

const userContext = createContext();

const getAuth = () => {
  const token = localStorage.getItem('user-login-token');
  return token ? `bearer ${token}` : null;
};

export const useUser = () => {
  const contex = useContext(userContext);
  if (!useContext) throw new Error('contect not found');
  return contex;
};

export function UserProvider({ children }) {
  const socket = io(import.meta.env.VITE_WEB_SOCKET_URL);
  const client = useQueryClient();
  const { isPending: loading, data, error } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => instance.get('/user', {
      headers: {
        Authorization: getAuth(),
      },
    }).then((res) => res.data),
  });

  if (error) toast(error?.response?.data.error || 'Internal error');

  const isLogged = () => !!data?.currentUser;

  const login = async (username, password) => {
    try {
      const tk = await instance.put('/login', {
        username,
        password,
      });
      if (tk?.data) {
        localStorage.setItem('user-login-token', tk.data.value);
        location.replace('/play');
      }
    } catch (err) {
      toast.error('Usuario o contraseña erronea');
    }
  };
  const register = async (username, password) => {
    try {
      const tk = await instance.post('/register', {
        // mutation: REGISTER,
        // variables: {
        username,
        password,
        // },
      });
      if (tk?.data) {
        localStorage.setItem('user-login-token', tk.data.value);
        location.replace('/play');
      }
    } catch (err) {
      toast.error('Error al prosesar la solicitud');
    }
  };
  const logout = () => {
    localStorage.removeItem('user-login-token');
    client.clear();
    location.reload();
  };

  return (
    <userContext.Provider
      value={{
        user: data?.currentUser,
        loading,
        isLogged,
        login,
        logout,
        register,
        socket,
      }}
    >
      {children}
      <ToastContainer
        theme="dark"
      />
    </userContext.Provider>
  );
}
