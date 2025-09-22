import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { 
  FaHeartbeat, FaHeart, FaShieldAlt, FaFileAlt, FaUserCircle, 
  FaShoppingCart, FaStethoscope, FaBars, FaTimes 
} from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const totalItemsInCart = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo" onClick={closeMenu}>
            <FaHeartbeat />
            <span>HealthMeds</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="navigation desktop-nav">
            <ul>
              <li className="dropdown">
                <Link to="/products">Nutritional Drinks & Supplements</Link>
                <div className="dropdown-content">
                  <Link to="/products?subcategory=Protein Drinks">Protein Drinks</Link>
                  <Link to="/products?subcategory=Vitamins">Vitamins</Link>
                  <Link to="/products?subcategory=Minerals">Minerals</Link>
                </div>
              </li>
              <li className="dropdown">
                <Link to="/products?category=Women Care"><FaHeart /> Women Care</Link>
                <div className="dropdown-content">
                  <Link to="/products?subcategory=Feminine Hygiene">Feminine Hygiene</Link>
                  <Link to="/products?subcategory=Pregnancy Care">Pregnancy Care</Link>
                </div>
              </li>
              <li className="dropdown">
                <Link to="/products?category=Personal Care"><FaShieldAlt /> Personal Care</Link>
                <div className="dropdown-content">
                  <Link to="/products?subcategory=Oral Care">Oral Care</Link>
                  <Link to="/products?subcategory=Body Care">Body Care</Link>
                </div>
              </li>
              <li className="dropdown">
                <Link to="/products?category=Health Devices"><FaStethoscope /> Health Devices</Link>
                <div className="dropdown-content">
                  <Link to="/products?subcategory=Blood Pressure Monitor">Blood Pressure Monitor</Link>
                  <Link to="/products?subcategory=Thermometer">Thermometer</Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="header-right desktop-actions">
          <Link to="/blogs" className="header-link"><FaFileAlt /> Blogs</Link>
          
          {user ? (
            <div className="profile-dropdown dropdown">
              <a href="#!" className="header-link"><FaUserCircle /> {user.name}</a>
              <div className="dropdown-content">
                <Link to="/profile">My Profile</Link>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="header-link"><FaUserCircle /> Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}

          <Link to="/cart" className="header-link cart-icon">
            <FaShoppingCart />
            {totalItemsInCart > 0 && (
              <span className="cart-count">{totalItemsInCart}</span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <nav className="mobile-nav">
            <Link to="/products" onClick={closeMenu}>Supplements</Link>
            <Link to="/products?category=Women Care" onClick={closeMenu}>Women Care</Link>
            <Link to="/products?category=Personal Care" onClick={closeMenu}>Personal Care</Link>
            <Link to="/products?category=Health Devices" onClick={closeMenu}>Health Devices</Link>
            <Link to="/blogs" onClick={closeMenu}>Blogs</Link>
            <hr />
            {user ? (
                <>
                    <Link to="/profile" onClick={closeMenu}>My Profile</Link>
                    <button onClick={() => { logout(); closeMenu(); }} className="mobile-logout-btn">Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                    <Link to="/signup" className="mobile-signup-btn" onClick={closeMenu}>Sign Up</Link>
                </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;