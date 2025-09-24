import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // This is the function to fetch orders for the logged-in user
  const fetchOrders = async (authToken) => {
    if (!authToken) return;
    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        headers: {
          'x-auth-token': authToken
        }
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        // Handle cases where the token might be expired
        logout();
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser(decoded.user);
        fetchOrders(token); // Fetch orders when the app loads and a token exists
        // In a real app, you'd fetch addresses too
        setAddresses([{ id: 1, type: 'Home', name: decoded.user.name, address: '123 Health St, Wellness City', pincode: '400001', state: 'Maharashtra', phone: decoded.user.phone }]);
      } catch (e) {
        logout(); // Clear everything if token is invalid
      }
    }
  }, [token]);

  const signup = async (userData) => {
    return fetch('http://localhost:3001/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  };

  const login = async (credentials) => {
    const response = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token); // This will trigger the useEffect above
      setUser(data.user);
      // In a real app, you'd fetch addresses too
      setAddresses([{ id: 1, type: 'Home', name: data.user.name, address: '123 Health St, Wellness City', pincode: '400001', state: 'Maharashtra', phone: data.user.phone }]);
      navigate('/');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAddresses([]);
    setOrders([]);
    localStorage.removeItem('token');
    navigate('/');
  };
  
  const addAddress = (newAddressData) => {
    // In a real app, this would be a POST request to the backend
    const newAddress = { id: Date.now(), ...newAddressData };
    setAddresses(prev => [...prev, newAddress]);
    return newAddress;
  };

  const addOrder = async (orderData) => {
    const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order.");
    }
    
    await fetchOrders(token); // Re-fetch orders after adding a new one
    
    return await response.json();
  };

  const value = { user, token, login, logout, signup, addresses, addAddress, orders, addOrder };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};