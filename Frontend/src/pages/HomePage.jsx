import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import HealthConditions from '../components/HealthConditions/HealthConditions';
import PopularProducts from '../components/PopularProducts/PopularProducts';

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <HealthConditions />
      <PopularProducts />
    </main>
  );
};

export default HomePage;