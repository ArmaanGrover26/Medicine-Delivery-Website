import React from 'react';
import './Footer.css';
// Import the necessary icons
import { FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsShieldFillCheck } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column about">
          <h3 className="logo-container">
            <BsShieldFillCheck className="logo-icon" /> HealthMeds
          </h3>
          <p>Your trusted partner in healthcare. Delivering quality medicines and wellness products to your doorstep with care and reliability.</p>
          <div className="contact-item">
            <FaPhoneAlt /> <span>1800-123-4567</span>
          </div>
          <div className="contact-item">
            <MdEmail /> <span>support@healthmeds.com</span>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt /> <span>Mumbai, India</span>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>About HealthMeds</h4>
            <ul>
              <li><a href="#/">Our Story</a></li>
              <li><a href="#/">Careers</a></li>
              <li><a href="#/">Press Releases</a></li>
              <li><a href="#/">Healthcare Blog</a></li>
              <li><a href="#/">Partner with Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Customer Support</h4>
            <ul>
              <li><a href="#/">Help Center</a></li>
              <li><a href="#/">Contact Us</a></li>
              <li><a href="#/">FAQs</a></li>
              <li><a href="#/">Order Tracking</a></li>
              <li><a href="#/">Returns & Refunds</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Policies</h4>
            <ul>
              <li><a href="#/">Privacy Policy</a></li>
              <li><a href="#/">Terms & Conditions</a></li>
              <li><a href="#/">Shipping Policy</a></li>
              <li><a href="#/">Cancellation Policy</a></li>
              <li><a href="#/">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#/">Upload Prescription</a></li>
              <li><a href="#/">Order Medicine</a></li>
              <li><a href="#/">Health Packages</a></li>
              <li><a href="#/">Lab Tests</a></li>
              <li><a href="#/">Consult Doctor</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="newsletter-text">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for health tips, exclusive offers, and latest updates.</p>
        </div>
        <form className="newsletter-form">
          <div className="email-input-container">
            <input type="email" placeholder="Enter your email" />
            <MdEmail className="email-icon" />
          </div>
          <button type="submit">Subscribe</button>
        </form>
      </div>
      
      <div className="footer-legal">
        <p>© 2024 HealthMeds. All rights reserved. | Licensed by Ministry of Health & Family Welfare</p>
        <div className="social-links">
          <span>Follow us:</span>
          <a href="#/" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#/" aria-label="Instagram"><FaInstagram /></a>
          <a href="#/" aria-label="Twitter"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;