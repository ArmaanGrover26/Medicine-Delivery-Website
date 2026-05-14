import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaBoxOpen, FaHeart, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';

const ProfilePage = () => {
  const { user, addresses, deleteAddress, orders } = useAuth(); // Get real orders
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert(`Profile updated for ${formData.fullName}`);
  };

  // Mock data for wishlist
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
                <input type="text" id="fullName" value={formData.fullName} onChange={handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" defaultValue={user?.email} readOnly />
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
              {orders && orders.length > 0 ? (
                orders.map(order => (
                  <div key={order.id} className="order-item">
                    <span>Order #ORD-{String(order.id).padStart(5, '0')}</span>
                    <span>{new Date(order.order_date).toLocaleDateString()}</span>
                    <span>₹{Number(order.total_amount).toFixed(2)}</span>
                    <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                ))
              ) : (
                <p>You haven't placed any orders yet.</p>
              )}
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
      case 'addresses':
        return (
          <div>
            <h3>Saved Addresses</h3>
            <p>Manage your saved delivery addresses.</p>
            <div className="saved-address-list">
              {addresses && addresses.length > 0 ? (
                addresses.map(addr => (
                  <div key={addr.id} className="saved-address-card">
                    <div className="address-details">
                      <strong>{addr.name} ({addr.type})</strong>
                      <span>{addr.address}, {addr.state} - {addr.pincode}</span>
                      <span>Phone: {addr.phone}</span>
                    </div>
                    <div className="address-actions">
                      <button className="edit-btn"><FaUserEdit /> Edit</button>
                      <button className="delete-btn" onClick={() => deleteAddress(addr.id)}><FaTrash /> Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>You have no saved addresses.</p>
              )}
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