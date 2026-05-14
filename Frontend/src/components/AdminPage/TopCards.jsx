import React from 'react';
import './TopCards.css';
import { FaShoppingCart, FaExclamationTriangle, FaDollarSign, FaUsers } from 'react-icons/fa';

const TopCards = ({ totalOrders, outOfStock, totalRevenue, totalCustomers }) => {
  return (
    <div className="top-cards-container">
      {/* Total Orders Card */}
      <div className="card">
        <div className="card-content">
          <p className="card-title">Total Orders</p>
          <h2 className="card-value">{totalOrders}</h2>
        </div>
        <div className="card-icon shopping-cart-icon">
          <FaShoppingCart />
        </div>
      </div>
      {/* Out of Stock Card */}
      <div className="card">
        <div className="card-content">
          <p className="card-title">Out of Stock</p>
          <h2 className="card-value">{outOfStock}</h2>
        </div>
        <div className="card-icon warning-icon">
          <FaExclamationTriangle />
        </div>
      </div>
      {/* Total Customers Card */}
      <div className="card">
        <div className="card-content">
          <p className="card-title">Total Customers</p>
          <h2 className="card-value">{totalCustomers}</h2>
        </div>
        <div className="card-icon users-icon">
          <FaUsers />
        </div>
      </div>
    </div>
  );
};

export default TopCards;
