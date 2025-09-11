import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Mock login function
  const login = (userData) => {
    // In a real app, you'd verify credentials with a backend here
    const mockUser = { name: 'John Doe', email: userData.email };
    setUser(mockUser);
    navigate('/profile'); // Redirect to profile page after login
  };

  // Logout function
  const logout = () => {
    setUser(null);
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to easily use the context
export const useAuth = () => {
  return useContext(AuthContext);
};