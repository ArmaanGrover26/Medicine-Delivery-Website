import React, { useEffect } from 'react';
import './AllProductsPage.css';
import { Link, useSearchParams } from 'react-router-dom';
import { products as allProducts } from '../productData';
import ProductCard from '../components/ProductCard/ProductCard';
import { BsArrowLeft } from 'react-icons/bs';

const AllProductsPage = () => {
  const [searchParams] = useSearchParams();
  const subcategoryFilter = searchParams.get('subcategory');
  const categoryFilter = searchParams.get('category');
  const conditionFilter = searchParams.get('condition'); // 1. Read the new 'condition' filter

  // Scroll to the top of the page whenever any filter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subcategoryFilter, categoryFilter, conditionFilter]);

  // 2. Updated filtering logic to handle all three cases
  const filteredProducts = allProducts.filter(product => {
    // If no filter is in the URL, show all products
    if (!subcategoryFilter && !categoryFilter && !conditionFilter) {
      return true;
    }
    // Check for a match with any of the applied filters
    if (subcategoryFilter && product.subcategory === subcategoryFilter) {
      return true;
    }
    if (categoryFilter && product.category === categoryFilter) {
      return true;
    }
    if (conditionFilter && product.condition === conditionFilter) {
      return true;
    }
    // If none of the above, don't include the product
    return false;
  });

  // 3. Update the page title to reflect any of the filters
  const pageTitle = subcategoryFilter || categoryFilter || conditionFilter || 'All Products';

  return (
    <div className="all-products-page">
      <div className="all-products-container">
        <Link to="/" className="back-to-home">
          <BsArrowLeft /> Back to Home
        </Link>
        <h1 className="all-products-title" style={{ textTransform: 'capitalize' }}>
          {pageTitle.replace('-', ' ')}
        </h1>
        
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="no-products-found">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;