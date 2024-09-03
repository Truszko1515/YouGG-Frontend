import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [activeUserIndex, setActiveUserIndex] = useState(0);

  useEffect(() => {
    // Load user sessions from sessionStorage
    const storedUsers = JSON.parse(sessionStorage.getItem('users')) || [];
    setUsers(storedUsers);

    if (storedUsers.length > 0) {
      setActiveUserIndex(0); // Default to the first user
    }
  }, []);

  const setLogoutTimer = (duration, index) => {
    setTimeout(() => {
      logout(index);
    }, duration);
  };

  const login = (data) => {
    const token = data;
    const decodedToken = jwtDecode(token);
    const user = { ...decodedToken, token };

    const newUsers = [...users, user];
    sessionStorage.setItem('users', JSON.stringify(newUsers));
    localStorage.setItem("users", JSON.stringify(newUsers)); // setting users

    sessionStorage.setItem('user', token);
    localStorage.setItem('user', token);

    setUsers(newUsers);
    setActiveUserIndex(newUsers.length - 1); // Set the new user as active
    setLogoutTimer((decodedToken.exp * 1000) - Date.now(), newUsers.length - 1);
  };

  const logout = (index = activeUserIndex) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
    sessionStorage.setItem('users', JSON.stringify(newUsers));
    localStorage.setItem("users", JSON.stringify(newUsers)); // test
  
    if (index === activeUserIndex && newUsers.length > 0) {
      setActiveUserIndex(0); // Set to the first user, if available
    } else if (newUsers.length === 0) {
      setActiveUserIndex(null); // No users left
    }
  };

  return (
    <AuthContext.Provider value={{ user: users[activeUserIndex], login, logout, users, setActiveUserIndex }}>
      {children}
    </AuthContext.Provider>
  );
};