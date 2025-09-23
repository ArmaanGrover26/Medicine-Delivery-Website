import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // This effect runs when the app loads to check if a token exists
  useEffect(() => {
    if (token) {
      try {
        // Decode the user info from the JWT payload
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser(decoded.user);
      } catch (e) {
        // If token is invalid, clear it
        localStorage.removeItem('token');
        setToken(null);
      }
    }
  }, [token]);

  // Function to handle user sign-up
  const signup = async (userData) => {
    return fetch('http://localhost:3001/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  };

  // Function to handle user login
  const login = async (credentials) => {
    const response = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      navigate('/profile');
    } else {
      // Let the component handle the error message by throwing an error
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  // The value provided to all components
  const value = { user, token, login, logout, signup };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};