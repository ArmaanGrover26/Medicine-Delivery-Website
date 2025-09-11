import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useAuth } from './context/AuthContext'; // Import the useAuth hook

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

// Admin Pages
import AdminDashboardPage from './components/AdminPage/AdminDashboardPage';
import AdminLoginPage from './components/AdminPage/AdminLoginPage';

// Protected Route for Regular Users
const UserProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get user state from the AuthContext
  if (!user) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Your Existing Protected Route for Admin (I've renamed it for clarity)
const AdminProtectedRoute = ({ children, isAdminLoggedIn }) => {
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  // Your state for the admin login
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <div className="App">
      <Routes>
        {/* Main Website Routes with Layout */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/products" element={<Layout><AllProductsPage /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/blogs" element={<Layout><BlogListPage /></Layout>} />
        <Route path="/blogs/:articleId" element={<Layout><ArticlePage /></Layout>} />

        {/* New Protected Profile Route */}
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