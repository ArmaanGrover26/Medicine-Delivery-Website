import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Track initialization status
  const navigate = useNavigate();

  // Fetch orders for the logged-in user
  const fetchOrders = async (authToken) => {
    if (!authToken) return;
    try {
      const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/orders`, {
        headers: {
          'x-auth-token': authToken
        }
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders - status:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  // Fetch addresses for the logged-in user
  const fetchAddresses = async (authToken) => {
    if (!authToken) return;
    try {
      const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/addresses`, {
        headers: {
          'x-auth-token': authToken
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      } else {
        console.error("Failed to fetch addresses - status:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser(decoded.user);
        fetchOrders(token);
        fetchAddresses(token); // Fetch addresses from database
      } catch (e) {
        logout();
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [token]);

  const signup = async (userData) => {
    return fetch(`\${import.meta.env.VITE_API_URL}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  };

  const login = async (credentials) => {
    const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token); // This will trigger the useEffect above
      setUser(data.user);
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

  const addAddress = async (newAddressData) => {
    try {
      const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(newAddressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add address.");
      }

      const newAddress = await response.json();
      await fetchAddresses(token); // Refresh addresses from database
      return newAddress;
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  };

  const addOrder = async (orderData) => {
    const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/orders`, {
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

  const value = { user, token, loading, login, logout, signup, addresses, addAddress, orders, addOrder };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};