import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL;

// All fetch calls use credentials: 'include' so the browser automatically
// sends the HTTP-only auth cookie with every request.
const authFetch = (url, options = {}) =>
  fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // One-time migration: clear any stale token from old localStorage-based auth system
  useEffect(() => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }, []);

  // Fetch orders for the logged-in user (cookie is sent automatically)
  const fetchOrders = async () => {
    try {
      const response = await authFetch(`${API}/api/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  // Fetch addresses for the logged-in user
  const fetchAddresses = async () => {
    try {
      const response = await authFetch(`${API}/api/addresses`);
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  // On every page load, ask the backend "is my cookie still valid?"
  // If the token has expired, the backend returns 401 and we show guest view.
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await authFetch(`${API}/api/users/me`);
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          // Load user-specific data in parallel
          fetchOrders();
          fetchAddresses();
        } else {
          // 401 means token expired or no cookie — treat as guest
          setUser(null);
          setAddresses([]);
          setOrders([]);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signup = async (userData) => {
    return authFetch(`${API}/api/users/signup`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  };

  const login = async (credentials) => {
    const response = await authFetch(`${API}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      // Load user data after login
      fetchOrders();
      fetchAddresses();
      navigate('/');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  };

  const logout = async () => {
    // Tell the backend to clear the cookie
    await authFetch(`${API}/api/users/logout`, { method: 'POST' });
    setUser(null);
    setAddresses([]);
    setOrders([]);
    navigate('/');
  };

  const addAddress = async (newAddressData) => {
    try {
      const response = await authFetch(`${API}/api/addresses`, {
        method: 'POST',
        body: JSON.stringify(newAddressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add address.');
      }

      await fetchAddresses();
      return await response.json();
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  };

  const addOrder = async (orderData) => {
    const response = await authFetch(`${API}/api/orders`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to place order.');
    }

    await fetchOrders();
    return await response.json();
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup,
    addresses,
    addAddress,
    orders,
    addOrder,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};