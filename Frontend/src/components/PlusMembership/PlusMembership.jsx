import React from 'react';
import './PlusMembership.css';
import familyImage from '../../assets/istockphoto-2163263337-612x612.jpg'; // 1. Add your family image to the assets folder

const PlusMembership = () => {
  return (
    <div className="plus-banner-container">
      <div className="plus-banner-content">
        <h2>Become a <span className="plus-text">Plus</span> member</h2>
        <h3>And enjoy extra bachat on every order</h3>
        <div className="divider-line"></div>
        <p>Save 5% on medicines, 50% on 1st lab test & get FREE delivery with PLUS membership. <a href="#/">Know more </a></p>
        <button className="explore-btn">Explore Now</button>
      </div>
      <div className="plus-banner-image">
        <img src={familyImage} alt="Happy Family" />
      </div>
    </div>
  );
};

export default PlusMembership;