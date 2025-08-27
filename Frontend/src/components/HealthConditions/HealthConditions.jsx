import React from 'react';
import './HealthConditions.css';
// Import all the icons we need for this section
import { IoWater } from "react-icons/io5";
import { FaThermometerHalf, FaHeart, FaShieldAlt, FaEye, FaSmile, FaBrain, FaBone, FaPhoneAlt } from 'react-icons/fa';
import { BsFillChatDotsFill } from "react-icons/bs";

// We add an 'icon' and 'color' property to each object
const conditions = [
  { name: 'Diabetes', desc: 'Blood sugar management', products: '15+', icon: <IoWater />, color: 'blue' },
  { name: 'Cold & Cough', desc: 'Relief from cold, cough', products: '20+', icon: <FaThermometerHalf />, color: 'red' },
  { name: 'Heart Care', desc: 'Cardiovascular health', products: '12+', icon: <FaHeart />, color: 'pink' },
  { name: 'Skin Care', desc: 'Skincare & dermatology', products: '25+', icon: <FaShieldAlt />, color: 'green' },
  { name: 'Eye Care', desc: 'Vision care & eye health', products: '8+', icon: <FaEye />, color: 'purple' },
  { name: 'Dental Care', desc: 'Oral hygiene & dental health', products: '10+', icon: <FaSmile />, color: 'yellow' },
  { name: 'Mental Health', desc: 'Mental wellness & stress', products: '6+', icon: <FaBrain />, color: 'light-blue' },
  { name: 'Bone & Joint', desc: 'Bone strength & joint', products: '9+', icon: <FaBone />, color: 'orange' },
];

const HealthConditions = () => {
  return (
    <section className="container">
      <h2 className="section-title">Browse by <span className="priority-text">Health Conditions</span></h2>
      <p className="section-subtitle">Find the right medicines and products for your specific health needs</p>
      
      <div className="conditions-grid">
        {conditions.map((condition, index) => (
          // The 'pink' card gets a special 'highlighted' class
          <div key={index} className={`condition-card ${condition.color === 'pink' ? 'highlighted' : ''}`}>
            {/* We pass the color to the icon container to style its background */}
            <div className={`condition-icon icon-bg-${condition.color}`}>
              {condition.icon}
            </div>
            <h3>{condition.name}</h3>
            <p>{condition.desc}</p>
            <a href="#/">{condition.products} products →</a>
          </div>
        ))}
      </div>

      {/* This is the new section at the bottom */}
      <div className="pharmacist-help">
        <span>Can't find what you're looking for? Our pharmacists are here to help.</span>
        <div className="help-links">
          <a href="#/" className="help-link">
            <FaPhoneAlt /> Call: 1800-123-4567
          </a>
          <a href="#/" className="help-link">
            <BsFillChatDotsFill /> Chat with Pharmacist
          </a>
        </div>
      </div>
    </section>
  );
};

export default HealthConditions;