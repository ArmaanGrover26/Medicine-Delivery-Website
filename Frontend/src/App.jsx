import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useAuth } from './context/AuthContext';

// Layout and Page Imports
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AllProductsPage from './pages/AllProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BlogListPage from './pages/BlogListPage';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage'; // 1. Import the new checkout page

// Admin Pages
import AdminDashboardPage from './components/AdminPage/AdminDashboardPage';
import AdminLoginPage from './components/AdminPage/AdminLoginPage';

// Protected Route for Regular Users
const UserProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Your Existing Protected Route for Admin
const AdminProtectedRoute = ({ children, isAdminLoggedIn }) => {
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <div className="App">
      <Routes>
        {/* Main Website Routes with Layout */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/products" element={<Layout><AllProductsPage /></Layout>} />
        <Route path="/products/:category" element={<Layout><AllProductsPage /></Layout>} />
        <Route path="/product/:productId" element={<Layout><ProductDetailPage /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/blogs" element={<Layout><BlogListPage /></Layout>} />
        <Route path="/blogs/:articleId" element={<Layout><ArticlePage /></Layout>} />

        {/* Protected User Routes */}
        <Route
          path="/profile"
          element={
            <Layout>
              <UserProtectedRoute>
                <ProfilePage />
              </UserProtectedRoute>
            </Layout>
          }
        />
        {/* 2. Add the new protected route for the checkout page */}
        <Route
          path="/checkout"
          element={
            <Layout>
              <UserProtectedRoute>
                <CheckoutPage />
              </UserProtectedRoute>
            </Layout>
          }
        />

        {/* Auth Routes without Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Admin Routes without Layout */}
        <Route path="/admin/login" element={<AdminLoginPage onLogin={() => setIsAdminLoggedIn(true)} />} />
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;