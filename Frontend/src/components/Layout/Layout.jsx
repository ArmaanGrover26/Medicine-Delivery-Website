import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// This component wraps your page content with the Header and Footer
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;