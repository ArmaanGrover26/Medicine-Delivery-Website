import React from 'react';
import './TopCards.css';
import { FaShoppingCart, FaExclamationTriangle, FaDollarSign, FaUsers } from 'react-icons/fa';

const TopCards = () => {
  return (
    <div className="top-cards-container">
      {/* Total Orders Card */}
      <div className="card">
        <div className="card-content">
          <p className="card-title">Total Orders</p>
          <h2 className="card-value">1,234</h2>
          <p className="card-change positive">+12% from last month</p>
        </div>
        <div className="card-icon shopping-cart-icon">
          <FaShoppingCart />
        </div>
      </div>
      {/* Out of Stock Card */}
      <div className="card">
        <div className="card-content">
          <p className="card-title">Out of Stock</p>
          <h2 className="card-value">23</h2>
          <p className="card-change negative">-5% from last month</p>
        </div>
        <div className="card-icon warning-icon">
          <FaExclamationTriangle />
        </div>
      </div>
      {/* Revenue Card */}
      <div className="card">
        <div className="card-content">
          <p className="card-title">Revenue</p>
          <h2 className="card-value">$45,678</h2>
          <p className="card-change positive">+18% from last month</p>
        </div>
        <div className="card-icon revenue-icon">
          <FaDollarSign />
        </div>
      </div>
      {/* Total Customers Card */}
      <div className="card">
        <div className="card-content">
          <p className="card-title">Total Customers</p>
          <h2 className="card-value">856</h2>
          <p className="card-change positive">+24% from last month</p>
        </div>
        <div className="card-icon users-icon">
          <FaUsers />
        </div>
      </div>
    </div>
  );
};

export default TopCards;