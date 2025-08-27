import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './PopularProducts.css';

const products = [
  {
    name: 'Paracetamol 500mg',
    manufacturer: 'Cipla Ltd',
    price: 45,
    originalPrice: 60,
    discount: 25,
    rating: 4.5,
    reviews: 534,
    category: 'Pain Relief',
    status: 'In Stock',
    rxRequired: false
  },
  {
    name: 'Cough Syrup 100ml',
    manufacturer: 'Dabur India Ltd',
    price: 85,
    originalPrice: 110,
    discount: 23,
    rating: 4.3,
    reviews: 267,
    category: 'Cold & Flu',
    status: 'Low Stock',
    rxRequired: true
  },
  {
    name: 'Cetirizine 10mg',
    manufacturer: "Dr. Reddy's",
    price: 38,
    originalPrice: 50,
    discount: 24,
    rating: 4.4,
    reviews: 189,
    category: 'Allergy Relief',
    status: 'In Stock',
    rxRequired: false
  }
];

const PopularProducts = () => {
  return (
    <section className="container popular-products-section">
      <h2 className="section-title">Popular <span className="priority-text">Medicines</span></h2>
      <p className="section-subtitle">Trusted by millions, recommended by experts</p>
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className="view-all-container">
        <button className="view-all-btn">View All Products →</button>
      </div>
    </section>
  );
};

export default PopularProducts;