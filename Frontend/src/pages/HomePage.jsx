import React, { useState } from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import HealthConditions from '../components/HealthConditions/HealthConditions';
import PopularProducts from '../components/PopularProducts/PopularProducts';
import PrescriptionUpload from '../components/PrescriptionUpload/PrescriptionUpload';
import PlusMembership from '../components/PlusMembership/PlusMembership';
import { products as allProducts } from '../productData';
import './HomePage.css'; // Make sure to create this CSS file

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 1) { // Start suggesting after 1 character
      const filteredSuggestions = allProducts.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Show up to 5 suggestions
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if search is too short
    }
  };

  return (
    <main>
      <HeroSection
        searchTerm={searchTerm}
        suggestions={suggestions}
        onSearchChange={handleSearchChange}
        // This function clears the search when a suggestion is clicked
        onSuggestionClick={() => {
          setSearchTerm('');
          setSuggestions([]);
        }}
      />
      
      {/* The main page content is wrapped in a container for consistent spacing */}
      <div className="container">
        <PrescriptionUpload />
        <HealthConditions />
        <PlusMembership />
        <PopularProducts />
      </div>
    </main>
  );
};

export default HomePage;
