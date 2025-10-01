import React from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaBoxes, FaUser, FaClipboardList, FaCog } from 'react-icons/fa';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">💊</div>
        <div className="logo-text">MediDelivery</div>
        <div className="admin-panel-text">Admin Panel</div>
      </div>
      <ul className="sidebar-menu">
        <li className={`menu-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentPage('dashboard')}>
          <div className="menu-icon"><FaTachometerAlt /></div>
          Dashboard
        </li>
        <li className={`menu-item ${currentPage === 'manage-medicines' ? 'active' : ''}`} onClick={() => setCurrentPage('manage-medicines')}>
          <div className="menu-icon"><FaBoxes /></div>
          Manage Medicines
        </li>
        <li className={`menu-item ${currentPage === 'orders' ? 'active' : ''}`} onClick={() => setCurrentPage('orders')}>
          <div className="menu-icon"><FaClipboardList /></div>
          Orders
        </li>
        <li className={`menu-item ${currentPage === 'customers' ? 'active' : ''}`} onClick={() => setCurrentPage('customers')}>
          <div className="menu-icon"><FaUser /></div>
          Customers
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;