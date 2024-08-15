import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a user is already logged in on component mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      const decodedToken = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        setUser(storedUser);
        setLogoutTimer((decodedToken.exp - currentTime) * 1000);
      } else {
        logout();
      }
    }
  }, []);

  const setLogoutTimer = (duration) => {
    setTimeout(() => {
      logout();
    }, duration);
  };

  const login = (data) => {
    const token = data;
    const decodedToken = jwtDecode(token);
    const user = { ...decodedToken, token };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    setUser(user);
    setLogoutTimer((decodedToken.exp * 1000) - Date.now());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};