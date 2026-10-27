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
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';         // 1. Import PaymentPage
import OrderSuccessPage from './pages/OrderSuccessPage'; // 2. Import OrderSuccessPage
import OrderDetailPage from './pages/OrderDetailPage';   // Order tracking page
import PrescriptionUploadPage from './pages/PrescriptionUploadPage'; // Prescription upload

// Delivery Partner Pages
import DeliveryLoginPage from './pages/DeliveryLoginPage';
import DeliverySignUpPage from './pages/DeliverySignUpPage';
import DeliveryDashboardPage from './pages/DeliveryDashboardPage';

// Admin Pages
import AdminDashboardPage from './components/AdminPage/AdminDashboardPage';
import AdminLoginPage from './components/AdminPage/AdminLoginPage';

// Protected Route for Delivery Partners
const DeliveryProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '4rem' }}>Loading Fleet Portal...</div>;
  }

  if (!user) {
    return <Navigate to="/delivery/login" replace />;
  }

  if (user.role !== 'delivery') {
    return <Navigate to="/delivery/login" replace />;
  }

  return children;
};

// Protected Route for Regular Users
const UserProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait for auth initialization to complete
  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner component
  }

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
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('admin_logged_in') === 'true';
  });

  const handleAdminLogin = () => {
    sessionStorage.setItem('admin_logged_in', 'true');
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    setIsAdminLoggedIn(false);
  };

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
        <Route path="/order-success" element={<Layout><OrderSuccessPage /></Layout>} />
        <Route path="/upload-prescription" element={<Layout><PrescriptionUploadPage /></Layout>} />

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
        {/* 3. Add the new protected route for the payment page */}
        <Route
          path="/payment"
          element={
            <Layout>
              <UserProtectedRoute>
                <PaymentPage />
              </UserProtectedRoute>
            </Layout>
          }
        />
        {/* Order Detail/Tracking Page */}
        <Route
          path="/orders/:orderId"
          element={
            <Layout>
              <UserProtectedRoute>
                <OrderDetailPage />
              </UserProtectedRoute>
            </Layout>
          }
        />

        {/* Auth Routes without Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Admin Routes without Layout */}
        <Route path="/admin/login" element={<AdminLoginPage onLogin={handleAdminLogin} />} />
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
              <AdminDashboardPage onLogout={handleAdminLogout} />
            </AdminProtectedRoute>
          }
        />

        {/* Delivery Partner Routes */}
        <Route path="/delivery/login" element={<DeliveryLoginPage />} />
        <Route path="/delivery/signup" element={<DeliverySignUpPage />} />
        <Route
          path="/delivery/dashboard"
          element={
            <DeliveryProtectedRoute>
              <DeliveryDashboardPage />
            </DeliveryProtectedRoute>
          }
        />
        {/* Alias /delivery redirect to /delivery/dashboard */}
        <Route path="/delivery" element={<Navigate to="/delivery/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;