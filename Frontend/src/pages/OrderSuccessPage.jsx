import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="order-success-container">
      <FaCheckCircle className="success-icon" />
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your purchase. You can track your order in your profile.</p>
      <div className="success-actions">
        <Link to="/profile" className="success-btn secondary">View Orders</Link>
        <Link to="/" className="success-btn primary">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;