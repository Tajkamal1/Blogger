import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');

  // Load user email from localStorage on component mount
  useEffect(() => {
    const storedUserEmail = localStorage.getItem('userEmail');
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
  }, []);

  const setUser = (email) => {
    setUserEmail(email);
    // Save user email to localStorage
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setUserEmail('');
    // Remove user email from localStorage on logout
    localStorage.removeItem('userEmail');
    // You can also perform other logout-related tasks here, like redirecting to the login page.
  };

  return (
    <UserContext.Provider value={{ userEmail, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
