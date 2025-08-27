import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Import Layout Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Page Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BlogListPage from './pages/BlogListPage';
import ArticlePage from './pages/ArticlePage';
import AllProductsPage from './pages/AllProductsPage'; // 1. Import the new page

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/blogs" element={<BlogListPage />} />
        <Route path="/blogs/:articleId" element={<ArticlePage />} />
        <Route path="/products" element={<AllProductsPage />} /> {/* 2. Add the new route */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;