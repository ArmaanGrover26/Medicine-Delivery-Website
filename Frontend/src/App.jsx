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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;