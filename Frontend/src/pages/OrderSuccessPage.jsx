import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const [countdown, setCountdown] = useState(3);
  const hasCleared = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Clear cart only once if instructed to do so
    if (location.state?.shouldClearCart && !hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }

    // Start countdown timer for auto-redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, [location.state]); // Only depend on location.state

  return (
    <div className="order-success-container">
      <FaCheckCircle className="success-icon" />
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
      <p className="redirect-message">Redirecting to home page in {countdown} seconds...</p>
      <div className="success-actions">
        <Link to="/profile" className="success-btn secondary">View Orders</Link>
        <Link to="/" className="success-btn primary">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;