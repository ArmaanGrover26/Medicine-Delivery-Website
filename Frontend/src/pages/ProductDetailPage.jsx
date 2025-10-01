import React, { useEffect } from 'react';
import './ProductDetailPage.css';
import { useParams, Link } from 'react-router-dom';
import { products } from '../productData';
import { useCart } from '../context/CartContext';

// Import Icons
import { BsArrowLeft, BsFileEarmarkMedicalFill } from 'react-icons/bs';
import { FaStar, FaHeart, FaExclamationTriangle, FaCheckCircle, FaBox, FaShippingFast } from 'react-icons/fa';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(productId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found!</h2>
        <Link to="/products">Back to All Products</Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="pdp-wrapper">
      <div className="pdp-container">
        <Link to="/products" className="back-to-products">
          <BsArrowLeft /> Back to Products
        </Link>
        <div className="pdp-main-content">
          {/* --- Left Column: Image & Info --- */}
          <div className="pdp-left-column">
            <div className="pdp-image-container">
              <img src={product.image || 'https://placehold.co/400'} alt={product.name} />
              {discount > 0 && <span className="pdp-discount-tag">{discount}% OFF</span>}
              {product.rxRequired && <span className="pdp-rx-tag"><BsFileEarmarkMedicalFill /> Prescription Required</span>}
            </div>
            <div className="pdp-info-boxes">
              <div className="pdp-info-box">
                <FaBox className="info-icon" />
                <div>
                  <strong>{product.status}</strong>
                  <span>{product.unitsAvailable || 'N/A'} units available</span>
                </div>
              </div>
              <div className="pdp-info-box">
                <FaShippingFast className="info-icon" />
                <div>
                  <strong>Fast Delivery</strong>
                  <span>2-3 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- Right Column: Details & Actions --- */}
          <div className="pdp-right-column">
            <span className="pdp-category">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="pdp-manufacturer">By {product.manufacturer}</p>
            <div className="pdp-reviews">
              <FaStar color="#ffc107" />
              <span>4.4 (189 reviews)</span>
            </div>
            <div className="pdp-price">
              <span className="current-price">₹{product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>}
              {discount > 0 && <span className="save-amount">Save {discount}%</span>}
            </div>
            <div className="pdp-actions">
              <button className="add-to-cart-btn-pdp" onClick={() => addToCart(product)}>Add to Cart</button>
              <button className="wishlist-btn-pdp"><FaHeart /></button>
            </div>
            <div className="pdp-details-accordion">
              <h3>Product Information</h3>
              <div className="detail-item">
                <strong>Manufacturer:</strong>
                <span>{product.manufacturer}</span>
              </div>
              <div className="detail-item">
                <strong>Expiry Date:</strong>
                <span>Jan 2026</span>
              </div>
              <h4>Description</h4>
              <p>{product.description}</p>
              <h4>Dosage</h4>
              <p>{product.dosage}</p>
              <div className="pdp-warnings">
                <h4><FaExclamationTriangle /> Side Effects</h4>
                <ul>
                  {product.sideEffects?.map((effect, i) => <li key={i}>{effect}</li>)}
                </ul>
                <h4><FaCheckCircle /> Precautions</h4>
                <ul>
                  {product.precautions?.map((caution, i) => <li key={i}>{caution}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;