import React, { useEffect, useRef } from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import heroBg from '../../assets/bgimage.jpg';
import { FaSearch, FaShieldAlt, FaBolt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';

const HeroSection = ({ searchTerm, suggestions, onSearchChange, onSuggestionClick }) => {
  const searchContainerRef = useRef(null);

  // Effect to handle clicks outside of the search bar to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        onSuggestionClick(); // Clear suggestions when clicking outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onSuggestionClick]);

  return (
    <div className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Your Health, Our <span className="priority-text">Priority</span></h1>
        <p>Get medicines, wellness products, and healthcare essentials delivered to your doorstep. Fast, reliable, and trusted by millions.</p>
        
        <div className="search-container" ref={searchContainerRef}>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for medicines, wellness products..."
              value={searchTerm}
              onChange={onSearchChange}
            />
          </div>
          
          {suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="suggestion-item"
                  onClick={onSuggestionClick} // Clear search on click
                >
                  <img src={product.image || 'https://placehold.co/40'} alt={product.name} />
                  <span>{product.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-item-icon green-bg"><FaShieldAlt /></div>
            <div className="stat-item-text"><strong>50,000+</strong><span>Products</span></div>
          </div>
          <div className="stat-item">
            <div className="stat-item-icon blue-bg"><FaClock /></div>
            <div className="stat-item-text"><strong>24/7</strong><span>Delivery</span></div>
          </div>
          <div className="stat-item">
            <div className="stat-item-icon purple-bg"><FaBolt /></div>
            <div className="stat-item-text"><strong>2M+</strong><span>Happy Users</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;