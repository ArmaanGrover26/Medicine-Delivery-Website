import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaBoxOpen, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // State to manage the form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '', // We'll add phone to the form
  });

  // When the component loads or the user changes, pre-fill the form
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || '',
        // In a real app, the phone number would also come from the user object
        phone: user.phone || '9876543210', 
      });
    }
  }, [user]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here to update the user's data
    alert(`Profile updated for ${formData.fullName}`);
  };

  // Mock data for other tabs
  const pastOrders = [{ id: '12345', date: '2025-08-28', total: '₹1,250', status: 'Delivered' }];
  const wishlist = [{ id: 6, name: 'Digital Thermometer', price: '₹250' }];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h3>Edit Profile</h3>
            <p>Update your personal and contact information below.</p>
            <form className="profile-edit-form" onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
               <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  defaultValue={user?.email} 
                  readOnly 
                />
              </div>
              <button type="submit" className="action-btn">Save Changes</button>
            </form>
          </div>
        );
      case 'orders':
        return (
          <div>
            <h3>Past Orders</h3>
            <div className="order-list">
              {pastOrders.map(order => (
                <div key={order.id} className="order-item">
                  <span>Order #{order.id}</span>
                  <span>{order.date}</span>
                  <span>{order.total}</span>
                  <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div>
            <h3>My Wishlist</h3>
            <div className="wishlist-list">
              {wishlist.map(item => (
                <div key={item.id} className="wishlist-item">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <h4>Select a category</h4>;
    }
  };

  return (
    <div className="profile-page-container">
      <Link to="/" className="back-to-home">
        <BsArrowLeft /> Back to Home
      </Link>

      <h2>My Account</h2>
      <div className="profile-dashboard">
        <div className="profile-sidebar">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.charAt(0)}</div>
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
          <nav className="profile-nav">
            <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>
              <FaUserEdit /> Edit Profile
            </button>
            <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>
              <FaBoxOpen /> Orders
            </button>
            <button onClick={() => setActiveTab('wishlist')} className={activeTab === 'wishlist' ? 'active' : ''}>
              <FaHeart /> Wishlist
            </button>
            <button onClick={() => setActiveTab('addresses')} className={activeTab === 'addresses' ? 'active' : ''}>
              <FaMapMarkerAlt /> Saved Addresses
            </button>
          </nav>
        </div>
        <div className="profile-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;