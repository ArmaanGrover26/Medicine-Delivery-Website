import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout and Page Imports
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AllProductsPage from './pages/AllProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BlogListPage from './pages/BlogListPage'; // 1. Import your BlogListPage

import './App.css'; 

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Routes that have the main Header and Footer */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/products" element={<Layout><AllProductsPage /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/blogs" element={<Layout><BlogListPage /></Layout>} /> {/* 2. Add the route for Blogs */}

        {/* Routes that are full-screen (no Header/Footer) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

      </Routes>
    </div>
  );
}

export default App;