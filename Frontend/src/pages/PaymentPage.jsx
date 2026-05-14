import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { FaRegMoneyBillAlt, FaCreditCard } from 'react-icons/fa';

const PaymentPage = () => {
  const { user, addOrder } = useAuth();
  const { cartItems, cartTotal, shippingAddress, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!shippingAddress || cartItems.length === 0) {
      navigate('/cart');
    }
  }, [shippingAddress, cartItems, navigate]);

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'cod') {
      setIsLoading(true);
      const orderData = {
        userId: user.id,
        cartItems: cartItems,
        cartTotal: cartTotal,
        shippingAddress: shippingAddress // Pass the full address object
      };

      try {
        // Navigate to success page BEFORE clearing cart to prevent redirect race condition
        await addOrder(orderData); // 1. Attempt to save the order
        navigate('/order-success', { state: { shouldClearCart: true } }); // 2. Navigate first
        // Cart will be cleared by OrderSuccessPage after it mounts
      } catch (error) {
        alert(`Failed to place order: ${error.message}`);
      } finally {
        setIsLoading(false);
      }

    } else {
      alert('Online payment is not yet available.');
    }
  };

  return (
    <div className="payment-page-container">
      <Link to="/checkout" className="back-link">
        <BsArrowLeft /> Back to Address
      </Link>

      <div className="payment-content">
        <h3>Payment</h3>
        <p>Choose your payment method to complete the purchase.</p>

        <div className="payment-options">
          <div
            className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('cod')}
          >
            <FaRegMoneyBillAlt />
            <span>Cash / Pay on Delivery</span>
          </div>
          <div
            className={`payment-option ${paymentMethod === 'online' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('online')}
          >
            <FaCreditCard />
            <span>UPI / Card / Netbanking</span>
          </div>
        </div>

        <div className="order-total-summary">
          <span>Amount to Pay:</span>
          <span className="total-amount">₹{cartTotal.toFixed(2)}</span>
        </div>

        <button className="place-order-btn" onClick={handlePlaceOrder} disabled={isLoading}>
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;