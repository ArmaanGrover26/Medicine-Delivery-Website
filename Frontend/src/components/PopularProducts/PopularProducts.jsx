import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './PopularProducts.css';
import { Link } from 'react-router-dom';
import { products as allProducts } from '../../productData';

// Receive the new props: searchTerm and sectionRef
const PopularProducts = ({ searchTerm, sectionRef }) => {
  
  // Filter the products based on the search term.
  // If the search term is empty, show the first 6 products.
  const filteredProducts = searchTerm
    ? allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allProducts.slice(0, 6);

  return (
    // Attach the ref to this section so we can scroll to it
    <section ref={sectionRef} className="container popular-products-section">
      <h2 className="section-title">Popular <span className="priority-text">Medicines</span></h2>
      <p className="section-subtitle">Trusted by millions, recommended by experts</p>
      
      <div className="products-grid">
        {/* Check if any products were found */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          // Show a message if no products match the search
          <p className="no-products-found">No products found matching your search.</p>
        )}
      </div>

      {/* Only show the "View All" button if the user is not searching */}
      {!searchTerm && (
        <div className="view-all-container">
          <Link to="/products" className="view-all-btn">View All Products →</Link>
        </div>
      )}
    </section>
  );
};

export default PopularProducts;