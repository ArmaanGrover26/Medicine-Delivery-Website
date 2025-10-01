import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);
const API_BASE_URL = 'http://localhost:8080/api';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    // Only fetch if a token exists
    if (!localStorage.getItem('authToken')) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/addresses`);
      setAddresses(response.data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      setAddresses([]);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setAuthToken(storedToken);
        fetchAddresses();
      } catch (e) {
        console.error("Failed to parse stored data:", e);
        logout();
      }
    }
  }, []);

  // --- THIS FUNCTION IS BEING ADDED BACK ---
  const signup = async (userData) => {
    try {
      const payload = {
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phone,
        passwordHash: userData.password,
      };
      // The signup endpoint is /api/users
      await axios.post(`${API_BASE_URL}/users`, payload);
    } catch (error) {
      const message = error.response?.data?.message || "An unexpected error occurred during signup.";
      console.error("Signup failed:", message);
      throw new Error(message);
    }
  };

  const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, {
          email: credentials.email,
          password: credentials.password,
        });
        
        const { user: loggedInUser, token } = response.data;

        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('authToken', token);

        setUser(loggedInUser);
        setAuthToken(token);
        
        await fetchAddresses();
        
        navigate('/');
        return loggedInUser;
      } catch (error) {
        const message = error.response?.data?.message || 'Invalid credentials.';
        console.error("Login failed:", message);
        throw new Error(message);
      }
  };
  
  const addAddress = async (newAddressData) => {
    if (!user) throw new Error("You must be logged in.");
    try {
      const response = await axios.post(`${API_BASE_URL}/addresses`, newAddressData);
      await fetchAddresses();
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add address.";
      console.error("Add address failed:", message);
      throw new Error(message);
    }
  };

  const addOrder = async (orderData) => {
    if (!user) throw new Error("You must be logged in.");
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      return response.data;
    } catch(error) {
      const message = error.response?.data?.message || "Failed to place order.";
      console.error("Place order failed:", message);
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    setAddresses([]);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // --- THE `signup` FUNCTION IS NOW CORRECTLY INCLUDED HERE ---
  const value = { user, authToken, addresses, fetchAddresses, login, logout, signup, addAddress, addOrder };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

