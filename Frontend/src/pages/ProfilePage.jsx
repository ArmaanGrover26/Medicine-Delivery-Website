import React, { useState } from 'react';
import './ProfilePage.css';
import { useAuth } from '../context/AuthContext';
import { FaUserEdit, FaBoxOpen, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock data
  const pastOrders = [{ id: '12345', date: '2025-08-28', total: '₹1,250', status: 'Delivered' }];
  const wishlist = [{ id: 6, name: 'Digital Thermometer', price: '₹250' }];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h3>Edit Profile</h3>
            <p>Update your personal information.</p>
            {/* Add form fields for profile editing here */}
          </div>
        );
      case 'orders':
        return (
          <div>
            <h3>Past Orders</h3>
            {pastOrders.map(order => (
              <div key={order.id} className="order-item">
                <span>Order #{order.id}</span>
                <span>{order.date}</span>
                <span>{order.total}</span>
                <span>{order.status}</span>
              </div>
            ))}
          </div>
        );
      case 'wishlist':
        return (
          <div>
            <h3>My Wishlist</h3>
            {wishlist.map(item => (
              <div key={item.id} className="wishlist-item">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-page-container">
      <h2>My Account</h2>
      <div className="profile-dashboard">
        <div className="profile-sidebar">
          <div className="user-info">
            <div className="user-avatar">{user?.name.charAt(0)}</div>
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
          <nav className="profile-nav">
            <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}><FaUserEdit /> Edit Profile</button>
            <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}><FaBoxOpen /> Orders</button>
            <button onClick={() => setActiveTab('wishlist')} className={activeTab === 'wishlist' ? 'active' : ''}><FaHeart /> Wishlist</button>
            <button><FaMapMarkerAlt /> Saved Addresses</button>
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