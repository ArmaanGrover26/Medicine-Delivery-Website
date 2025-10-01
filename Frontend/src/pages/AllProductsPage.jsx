import React from 'react';
import './AllProductsPage.css';
import { Link } from 'react-router-dom';
import { products } from '../productData'; // Import all products
import ProductCard from '../components/ProductCard/ProductCard';
import { BsArrowLeft } from 'react-icons/bs';

const AllProductsPage = () => {
  return (
    <div className="all-products-page">
      <div className="all-products-container">
        <Link to="/" className="back-to-home">
          <BsArrowLeft /> Back to Home
        </Link>
        <h1 className="all-products-title">All Products</h1>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;