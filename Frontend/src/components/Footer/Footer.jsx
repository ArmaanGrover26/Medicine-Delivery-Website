import React from 'react';
import './Footer.css';
import { FaHeartbeat } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-about">
            <div className="footer-logo">
              <FaHeartbeat />
              <span>HealthMeds</span>
            </div>
            <p>Your trusted partner in healthcare. Delivering quality medicines and wellness products to your doorstep with care and reliability.</p>
          </div>
          <div className="footer-links">
            <h4>About HealthMeds</h4>
            <a href="#">Our Story</a>
            <a href="#">Careers</a>
            <a href="#">Press Releases</a>
            <a href="#">Healthcare Blog</a>
          </div>
          <div className="footer-links">
            <h4>Customer Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
            <a href="#">FAQs</a>
            <a href="#">Order Tracking</a>
          </div>
          <div className="footer-links">
            <h4>Policies</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Cancellation Policy</a>
          </div>
        </div>
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for health tips and exclusive offers.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-bottom">
          <p>© 2025 HealthMeds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;