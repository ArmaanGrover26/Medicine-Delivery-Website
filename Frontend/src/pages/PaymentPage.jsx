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
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Redirect if there's no address selected or cart is empty
    if (!shippingAddress || cartItems.length === 0) {
      navigate('/cart');
    }
  }, [shippingAddress, cartItems, navigate]);

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'cod') {
      const orderData = {
        userId: user.id,
        cartItems: cartItems,
        cartTotal: cartTotal,
        shippingAddress: {
          name: shippingAddress.name,
          address: shippingAddress.address,
          phone: shippingAddress.phone,
        }
      };
      
      try {
        await addOrder(orderData); // This function now calls the backend
        clearCart();
        navigate('/order-success');
      } catch (error) {
        alert(`Failed to place order: ${error.message}`);
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
        
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;