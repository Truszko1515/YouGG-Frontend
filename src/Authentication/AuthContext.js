import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // user is Jwt Token 
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const tokenExpired = () => {
    user.
  }

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);