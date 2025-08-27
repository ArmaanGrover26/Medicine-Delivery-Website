import React from 'react';
import './HeroSection.css';
import heroBg from '../../assets/hero-background.jpg';
import { FaSearch, FaShieldAlt, FaBolt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';

const HeroSection = ({ searchTerm, onSearchChange, searchInputRef }) => {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Your Health, Our <span className="priority-text">Priority</span></h1>
        <p>Get medicines, wellness products, and healthcare essentials delivered to your doorstep. Fast, reliable, and trusted by millions.</p>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            ref={searchInputRef} // This ref is required for the re-focus feature
            type="text"
            placeholder="Search for medicines, wellness products..."
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-item-icon green-bg">
              <FaShieldAlt />
            </div>
            <div className="stat-item-text">
              <strong>50,000+</strong>
              <span>Products</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-item-icon blue-bg">
              <FaClock />
            </div>
            <div className="stat-item-text">
              <strong>24/7</strong>
              <span>Delivery</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-item-icon purple-bg">
              <FaBolt />
            </div>
            <div className="stat-item-text">
              <strong>2M+</strong>
              <span>Happy Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;