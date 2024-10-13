import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
  const login = (email) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email) {
        setUser(parsedUser);  
        localStorage.setItem('loggedInUser', JSON.stringify(parsedUser));  
        return;
      }
    }
    throw new Error('Invalid email');
  };

  
  const signup = (email) => {
    const newUser = { email };
    localStorage.setItem('user', JSON.stringify(newUser));  
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');  
    setUser(null);  
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
