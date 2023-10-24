const getAuth = () => {
  const token = localStorage.getItem('user-login-token');
  return token ? `bearer ${token}` : null;
};

export default getAuth;
