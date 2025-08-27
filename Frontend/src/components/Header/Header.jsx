import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaHeart, FaShieldAlt, FaFileAlt, FaUserCircle, FaShoppingCart, FaStethoscope } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Left side of the header */}
        <div className="header-left">
          <div className="logo">
            <FaHeartbeat />
            <span>HealthMeds</span>
          </div>
          <nav className="navigation">
            <ul>
              <li className="dropdown">
                <a href="#/">Nutritional Drinks & Supplements &#9662;</a>
                <div className="dropdown-content">
                  <a href="#/">Protein Drinks</a>
                  <a href="#/">Vitamins</a>
                  <a href="#/">Minerals</a>
                  <a href="#/">Energy Drinks</a>
                </div>
              </li>
              <li className="dropdown">
                <a href="#/"><FaHeart /> Women Care &#9662;</a>
                <div className="dropdown-content">
                  <a href="#/">Feminine Hygiene</a>
                  <a href="#/">Pregnancy Care</a>
                  <a href="#/">Skincare</a>
                  <a href="#/">Hair Care</a>
                </div>
              </li>
              <li className="dropdown">
                <a href="#/"><FaShieldAlt /> Personal Care &#9662;</a>
                <div className="dropdown-content">
                  <a href="#/">Oral Care</a>
                  <a href="#/">Body Care</a>
                  <a href="#/">Face Care</a>
                  <a href="#/">Hair Care</a>
                </div>
              </li>
              <li className="dropdown">
                <a href="#/"><FaStethoscope /> Health Devices &#9662;</a>
                <div className="dropdown-content">
                  <a href="#/">Blood Pressure Monitor</a>
                  <a href="#/">Thermometer</a>
                  <a href="#/">Glucose Monitor</a>
                  <a href="#/">Pulse Oximeter</a>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right side of the header */}
        <div className="header-right">
          <Link to="/blogs" className="header-link"><FaFileAlt /> Blogs</Link>
          <Link to="/login" className="header-link"><FaUserCircle /> Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
          <a href="#/" className="header-link cart-icon"><FaShoppingCart /></a>
        </div>
      </div>
    </header>
  );
};

export default Header;