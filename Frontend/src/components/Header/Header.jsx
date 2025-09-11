import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // 1. Import the authentication context hook
import { FaShoppingCart, FaHeart, FaShieldAlt, FaFileAlt, FaUserCircle, FaStethoscope } from 'react-icons/fa';

const Header = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth(); // 2. Get the current user and logout function
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and Navigation links remain the same */}
        <div className="logo">
          <Link to="/">
            <FaHeart className="logo-icon" /> HealthMeds
          </Link>
        </div>
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
              <Link to="/products"><FaHeart /> Women Care ▼</Link>
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
          {/* 3. Conditionally render based on user login state */}
          {user ? (
            // If user is logged in, show the profile dropdown
            <div className="profile-dropdown dropdown">
              <a href="#!" className="login-link">
                <FaUserCircle /> {user.name} ▼
              </a>
              <div className="dropdown-content">
                <Link to="/profile">My Profile</Link>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            </div>
          ) : (
            // If user is logged out, show Login and Sign Up
            <>
              <Link to="/login" className="login-link"><FaUserCircle /> Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}

          {/* The cart icon is always visible */}
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