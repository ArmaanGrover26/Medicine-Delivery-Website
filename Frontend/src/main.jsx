import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Ensure this path is correct
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider> {/* Wrap the App with the AuthProvider */}
        <App />
      </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);