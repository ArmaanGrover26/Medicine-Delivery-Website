import React from 'react';
import './SubscriptionModal.css';
import { useCart } from '../../context/CartContext'; // To add plans to the cart
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

// Define the subscription plans
const subscriptionPlans = [
  {
    id: 9001,
    name: 'HealthMeds Plus - 3 Months',
    duration: '3 Months',
    price: 299,
    originalPrice: 450,
    savings: '33%',
    isPopular: false,
    image: 'https://placehold.co/80x80/eaf5ff/1E3A8A?text=3-Mo', // Placeholder image
  },
  {
    id: 9002,
    name: 'HealthMeds Plus - 6 Months',
    duration: '6 Months',
    price: 499,
    originalPrice: 900,
    savings: '45%',
    isPopular: true,
    image: 'https://placehold.co/80x80/eaf5ff/1E3A8A?text=6-Mo', // Placeholder image
  },
  {
    id: 9003,
    name: 'HealthMeds Plus - 12 Months',
    duration: '12 Months',
    price: 899,
    originalPrice: 1800,
    savings: '50%',
    isPopular: false,
    image: 'https://placehold.co/80x80/eaf5ff/1E3A8A?text=1-Yr', // Placeholder image
  },
];

const SubscriptionModal = ({ onClose }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (plan) => {
    addToCart(plan); // Add the selected plan to the cart
    onClose(); // Close the modal after adding
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Choose Your Plus Membership</h2>
        <p>Select a plan that best suits your needs and start saving today!</p>
        <div className="plans-container">
          {subscriptionPlans.map((plan) => (
            <div key={plan.id} className={`plan-card ${plan.isPopular ? 'popular' : ''}`}>
              {plan.isPopular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-duration">{plan.duration}</div>
              <div className="plan-price">
                ₹{plan.price} <span className="original-price">₹{plan.originalPrice}</span>
              </div>
              <div className="plan-savings">You save {plan.savings}!</div>
              <button className="add-to-cart-btn-modal" onClick={() => handleAddToCart(plan)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <FaCheckCircle className="footer-icon" /> All plans include 5% extra discount, 50% off lab tests, and FREE delivery.
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;