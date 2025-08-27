import React from 'react';
import './ProductCard.css';
import pillImage from '../../assets/pill-image.png'; // Make sure this image exists

const ProductCard = ({ product }) => {
  const {
    name,
    manufacturer,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    category,
    status,
    rxRequired
  } = product;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={pillImage} alt={name} className="product-image" />
        {discount && <span className="discount-tag">{discount}% OFF</span>}
        {status && <span className={`status-tag ${status.toLowerCase().replace(' ', '-')}`}>{status}</span>}
        {rxRequired && <span className="rx-tag">Rx Required</span>}
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-name">{name}</h3>
        <p className="product-manufacturer">{manufacturer}</p>
        <div className="product-rating">
          <span>⭐ {rating}</span> ({reviews} reviews)
        </div>
        <div className="product-price">
          <span className="current-price">₹{price}</span>
          {originalPrice && <span className="original-price">₹{originalPrice}</span>}
        </div>
        <div className="product-actions">
           <button className="add-to-cart-btn">Add to Cart</button>
           <button className="wishlist-btn">♡</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;