import React, { useState, useRef } from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import HealthConditions from '../components/HealthConditions/HealthConditions';
import PopularProducts from '../components/PopularProducts/PopularProducts';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create refs for both the section to scroll to AND the input to focus
  const productsSectionRef = useRef(null);
  const searchInputRef = useRef(null); // New ref for the search input

  const handleSearchChange = (event) => {
    const newTerm = event.target.value;
    
    if (newTerm.length === 4) {
      productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      
      // After scrolling, set the focus back to the input field.
      // We use a short delay to ensure the focus happens after the scroll animation.
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 500); // 500ms delay
    }
    
    setSearchTerm(newTerm);
  };

  return (
    <main>
      <HeroSection
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        // Pass the new ref down to the HeroSection
        searchInputRef={searchInputRef}
      />
      <HealthConditions />
      <PopularProducts
        searchTerm={searchTerm}
        sectionRef={productsSectionRef}
      />
    </main>
  );
};

export default HomePage;