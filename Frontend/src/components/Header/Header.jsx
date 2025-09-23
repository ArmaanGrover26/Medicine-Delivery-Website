import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaHeartbeat, FaShieldAlt, FaFileAlt, FaUserCircle, FaStethoscope } from 'react-icons/fa'; // Updated: Imported FaHeartbeat

const Header = () => {
  const { cartItems } = useCart();
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo on the left */}
        <div className="logo">
          <Link to="/">
            {/* Replaced with FaHeartbeat icon */}
            <FaHeartbeat className="logo-icon" /> HealthMeds
          </Link>
        </div>

        {/* Navigation links with dropdowns */}
        <nav className="navigation">
          <ul>
            <li className="dropdown">
              <Link to="/products">Nutritional Drinks & Supplements ▼</Link>
              <div className="dropdown-content">
                <Link to="/products">Protein Drinks</Link>
                <Link to="/products">Vitamins</Link>
                <Link to="/products">Minerals</Link>
              </div>
            </li>
            <li className="dropdown">
              <Link to="/products"><FaHeartbeat /> Women Care ▼</Link>
              <div className="dropdown-content">
                <Link to="/products">Feminine Hygiene</Link>
                <Link to="/products">Pregnancy Care</Link>
              </div>
            </li>
            <li className="dropdown">
              <Link to="/products"><FaShieldAlt /> Personal Care ▼</Link>
              <div className="dropdown-content">
                <Link to="/products">Oral Care</Link>
                <Link to="/products">Body Care</Link>
              </div>
            </li>
            <li className="dropdown">
              <Link to="/products"><FaStethoscope /> Health Devices ▼</Link>
              <div className="dropdown-content">
                <Link to="/products">Blood Pressure Monitor</Link>
                <Link to="/products">Thermometer</Link>
              </div>
            </li>
            <li>
              <Link to="/blogs"><FaFileAlt /> Blogs</Link>
            </li>
          </ul>
        </nav>

        {/* Action buttons on the right */}
        <div className="header-actions">
          <Link to="/login" className="login-link"><FaUserCircle /> Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
          <Link to="/cart" className="cart-icon-wrapper">
            <FaShoppingCart className="cart-icon" />
            {totalItemsInCart > 0 && (
              <span className="cart-count">{totalItemsInCart}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;