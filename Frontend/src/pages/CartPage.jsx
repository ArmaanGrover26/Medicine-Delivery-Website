import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartPage.css';
import { FaTrash } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';

const CartPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalMRP = cartItems.reduce((total, item) => total + (item.originalPrice || item.price) * item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalDiscount = totalMRP - cartTotal;

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      decreaseQuantity(item.id);
    }
  };

  return (
    <div className="cart-page-wrapper">
      <Link to="/" className="back-to-home">
        <BsArrowLeft /> Back to Home
      </Link>
      
      <div className="cart-page-container">
        {/* --- LEFT SECTION: CART ITEMS --- */}
        <div className="cart-items-section">
          <h2 className="cart-header">MY CART ({cartItems.length} ITEMS)</h2>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h3>Your cart is empty!</h3>
              <p>Looks like you haven't added anything yet.</p>
              <Link to="/products" className="shop-now-btn">Shop Now</Link>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image || 'https://placehold.co/90'} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-manufacturer">{item.manufacturer}</p>
                    <div className="item-pricing">
                      <span className="price">₹{item.price.toFixed(2)}</span>
                      {item.originalPrice && <span className="mrp">₹{item.originalPrice.toFixed(2)}</span>}
                    </div>
                  </div>
                  <div className="item-actions-cart">
                    <div className="quantity-control">
                      <button onClick={() => handleDecrease(item)}>
                        {item.quantity === 1 ? <FaTrash /> : '-'}
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- RIGHT SECTION: CART SUMMARY --- */}
        {cartItems.length > 0 && (
          <div className="cart-summary-section">
            <h4>PRICE DETAILS</h4>
            <div className="apply-coupon">
              <input type="text" placeholder="Enter Coupon Code" />
              <button>APPLY</button>
            </div>
            <div className="price-line">
              <span>Total MRP</span>
              <span>₹{totalMRP.toFixed(2)}</span>
            </div>
            <div className="price-line discount">
              <span>Discount on MRP</span>
              <span>- ₹{totalDiscount.toFixed(2)}</span>
            </div>
            <hr />
            <div className="price-line to-pay">
              <span>Total Amount</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="savings-banner">
              You will save ₹{totalDiscount.toFixed(2)} on this order
            </div>

            {user ? (
              // This button is now a Link to the checkout page
              <Link to="/checkout" className="proceed-btn">Proceed to Checkout</Link>
            ) : (
              <Link to="/login" className="proceed-btn">Login to Place Order</Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;