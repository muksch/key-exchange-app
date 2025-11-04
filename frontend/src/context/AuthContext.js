import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    console.log('User logged in.');
  };

  const logout = () => {
    setIsLoggedIn(false);
    console.log('User logged out.');
  };

  const contextValue = {
    isLoggedIn,
    login,
    logout,
  };
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
