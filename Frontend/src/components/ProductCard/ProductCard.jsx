import React from 'react';
import './ProductCard.css';
import { useCart } from '../../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const itemInCart = cartItems.find(item => item.id === product.id);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-manufacturer">{product.manufacturer}</p>
        <div className="product-price">
          <span className="current-price">₹{product.price}</span>
          {product.originalPrice && <span className="original-price">₹{product.originalPrice}</span>}
        </div>
      </div>
      <div className="product-actions">
        {itemInCart ? (
          <div className="quantity-control-card">
            <button onClick={() => decreaseQuantity(product.id)}>
              {itemInCart.quantity === 1 ? <FaTrash /> : '-'}
            </button>
            <span>{itemInCart.quantity}</span>
            <button onClick={() => increaseQuantity(product.id)}>+</button>
          </div>
        ) : (
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        )}
        <button className="wishlist-btn">♡</button>
      </div>
    </div>
  );
};

export default ProductCard;