import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// A sample address to start with for a logged-in user
const MOCK_SAVED_ADDRESSES = [
  { id: 1, type: 'Home', name: 'John Doe', address: '123, Health St, Wellness City', pincode: '400001', state: 'Maharashtra', phone: '9876543210' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]); // State for addresses
  const navigate = useNavigate();

  const login = (userData) => {
    const mockUser = { name: userData.name || 'John Doe', email: userData.email };
    setUser(mockUser);
    setAddresses(MOCK_SAVED_ADDRESSES); // Load mock addresses on login
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    setAddresses([]); // Clear addresses on logout
    navigate('/');
  };
  
  // Function to add a new address
  const addAddress = (newAddress) => {
    setAddresses(prevAddresses => [...prevAddresses, { id: Date.now(), ...newAddress }]);
  };

  return (
    <AuthContext.Provider value={{ user, addresses, login, logout, addAddress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};