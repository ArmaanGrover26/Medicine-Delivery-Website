import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // 1. Import useParams
import { FaCheckCircle } from 'react-icons/fa';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  const { orderId } = useParams(); // 2. Get the orderId from the URL

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="order-success-container">
      <FaCheckCircle className="success-icon" />
      <h2>Order Placed Successfully!</h2>
      
      {/* 3. Display the specific order ID */}
      {orderId && (
        <p className="order-id-confirmation">
          Your Order ID is: <strong>#ORD-{String(orderId).padStart(5, '0')}</strong>
        </p>
      )}

      <p>Thank you for your purchase. You can track your order in your profile.</p>
      <div className="success-actions">
        <Link to="/profile" className="success-btn secondary">View Orders</Link>
        <Link to="/" className="success-btn primary">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
