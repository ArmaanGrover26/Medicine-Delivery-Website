// import React from 'react';
// import './App.css';
// import { Routes, Route } from 'react-router-dom';

// // Import Layout Components
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';

// // Import Page Components
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';
// import BlogListPage from './pages/BlogListPage';
// import ArticlePage from './pages/ArticlePage';
// import AllProductsPage from './pages/AllProductsPage';

// // Import Admin Dashboard Page
// import AdminDashboardPage from './components/AdminPage/AdminDashboardPage'; // Corrected path

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         {/* Main website routes with Header and Footer */}
//         <Route path="/" element={<><Header /><HomePage /><Footer /></>} />
//         <Route path="/login" element={<><Header /><LoginPage /><Footer /></>} />
//         <Route path="/signup" element={<><Header /><SignUpPage /><Footer /></>} />
//         <Route path="/blogs" element={<><Header /><BlogListPage /><Footer /></>} />
//         <Route path="/blogs/:articleId" element={<><Header /><ArticlePage /><Footer /></>} />
//         <Route path="/products" element={<><Header /><AllProductsPage /><Footer /></>} />
        
//         {/* Admin Dashboard route without Header and Footer */}
//         <Route path="/admin" element={<AdminDashboardPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;




import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Layout Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Page Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BlogListPage from './pages/BlogListPage';
import ArticlePage from './pages/ArticlePage';
import AllProductsPage from './pages/AllProductsPage';

// Import Admin Dashboard Page and Login Page
import AdminDashboardPage from './components/AdminPage/AdminDashboardPage';
import AdminLoginPage from './components/AdminPage/AdminLoginPage';

// This is a component to protect the admin route
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
        {/* Main website routes with Header and Footer */}
        <Route path="/" element={<><Header /><HomePage /><Footer /></>} />
        <Route path="/login" element={<><Header /><LoginPage /><Footer /></>} />
        <Route path="/signup" element={<><Header /><SignUpPage /><Footer /></>} />
        <Route path="/blogs" element={<><Header /><BlogListPage /><Footer /></>} />
        <Route path="/blogs/:articleId" element={<><Header /><ArticlePage /><Footer /></>} />
        <Route path="/products" element={<><Header /><AllProductsPage /><Footer /></>} />
        
        {/* Admin Dashboard routes */}
        <Route path="/admin/login" element={<AdminLoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/admin/*" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <AdminDashboardPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
