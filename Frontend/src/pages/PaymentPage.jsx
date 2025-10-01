import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { FaRegMoneyBillAlt, FaCreditCard } from 'react-icons/fa';

const PaymentPage = () => {
  const { addOrder } = useAuth();
  const { cartItems, cartTotal, shippingAddress, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!shippingAddress || cartItems.length === 0) {
      navigate('/cart');
    }
  }, []);

  const handlePlaceOrder = async () => {
    if (paymentMethod !== 'cod') {
        return alert('Online payment is not yet available. Please select Cash on Delivery.');
    }
    
    setIsLoading(true);

    const orderItemsPayload = cartItems.map(item => ({
        productName: item.name,
        quantity: item.quantity,
        price: item.price
    }));

    const orderPayload = {
        totalAmount: cartTotal,
        status: "Pending",
        shippingName: shippingAddress.name,
        shippingAddress: `${shippingAddress.address}, ${shippingAddress.state} - ${shippingAddress.pincode}`,
        shippingPhone: shippingAddress.phone,
        orderItems: orderItemsPayload
    };
    
    try {
      console.log("Attempting to place order with payload:", orderPayload);
      const createdOrder = await addOrder(orderPayload); 
      
      console.log("Backend response after creating order:", createdOrder);

      if (createdOrder && createdOrder.id) {
        console.log("Order created successfully with ID:", createdOrder.id, ". Redirecting to home page...");
        clearCart();
        
        // --- THIS LINE HAS BEEN CHANGED ---
        // It now redirects to the home page ('/') as requested.
        navigate('/'); 

      } else {
        throw new Error("Received an invalid response from the server after placing order. Check the console for details.");
      }

    } catch (error) {
      console.error("Error during place order:", error);
      alert(`Failed to place order: ${error.message}`);
    } finally {
      setIsLoading(false);
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