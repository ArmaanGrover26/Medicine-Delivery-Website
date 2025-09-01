import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout and Page Imports
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AllProductsPage from './pages/AllProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BlogListPage from './pages/BlogListPage';
import ArticlePage from './pages/ArticlePage';

// Admin Pages
import AdminDashboardPage from './components/AdminPage/AdminDashboardPage';
import AdminLoginPage from './components/AdminPage/AdminLoginPage';

// Protected Route Component
const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Routes>
        {/* Main Website Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/products" element={<Layout><AllProductsPage /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/blogs" element={<Layout><BlogListPage /></Layout>} />
        <Route path="/blogs/:articleId" element={<Layout><ArticlePage /></Layout>} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
