import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon

const ProductCard = ({ product }) => {
  // Get all the necessary items and functions from the cart context
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // Check if this specific product is already in the cart
  const itemInCart = cartItems.find(item => item.id === product.id);

  // --- Event Handlers ---
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevents the Link from navigating
    addToCart(product);
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    increaseQuantity(product.id);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    if (itemInCart.quantity === 1) {
      removeFromCart(product.id);
    } else {
      decreaseQuantity(product.id);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img src={product.image || 'https://placehold.co/250'} alt={product.name} className="product-image" />
        {product.discount && <span className="discount-tag">{product.discount}% OFF</span>}
        {product.status && <span className={`status-tag ${product.status.toLowerCase().replace(' ', '-')}`}>{product.status}</span>}
        {product.rxRequired && <span className="rx-tag">Rx Required</span>}
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-manufacturer">{product.manufacturer}</p>
        <div className="product-price">
          <span className="current-price">₹{product.price}</span>
          {product.originalPrice && <span className="original-price">₹{product.originalPrice}</span>}
        </div>
        <div className="product-actions">
          {itemInCart ? (
            // If the item is in the cart, show the quantity controller
            <div className="quantity-control-card" onClick={(e) => e.preventDefault()}>
              <button onClick={handleDecrease}>
                {itemInCart.quantity === 1 ? <FaTrash /> : '−'}
              </button>
              <span>{itemInCart.quantity}</span>
              <button onClick={handleIncrease}>+</button>
            </div>
          ) : (
            // Otherwise, show the "Add to Cart" button
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
          
          <button className="wishlist-btn" onClick={(e) => e.preventDefault()}>♡</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;