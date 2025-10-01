import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaBoxOpen, FaHeart, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import axios from 'axios';

const ProfilePage = () => {
  const { user, addresses, authToken } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        phone: user.phoneNumber || '',
      });
    }
  }, [user]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // --- THIS LINE HAS BEEN CORRECTED ---
        // It now calls the correct endpoint, '/api/orders', which matches the updated OrderController.
        const response = await axios.get('http://localhost:8080/api/orders', {
          headers: {
            'Authorization': `Bearer ${authToken}` 
          }
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Could not load your orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [authToken]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert(`Profile updated for ${formData.fullName}`);
  };

  const handleDeleteAddress = (addressId) => {
    alert(`(Placeholder) Deleting address with ID: ${addressId}`);
  };

  if (!user) {
    return (
      <div className="profile-page-container">
        <h2>My Account</h2>
        <p>Please <Link to="/login">log in</Link> to view your profile.</p>
      </div>
    );
  }

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
                    <input type="email" id="email" defaultValue={user.email} readOnly />
                </div>
                <button type="submit" className="action-btn">Save Changes</button>
            </form>
          </div>
        );
      case 'orders':
        if (isLoading) {
            return <p>Loading your orders...</p>;
        }
        if (error) {
            return <p style={{ color: 'red' }}>{error}</p>;
        }
        return (
          <div>
            <h3>Past Orders</h3>
            <div className="order-history-list">
              {orders.length > 0 ? (
                orders.map(order => (
                  <div key={order.id} className="order-history-card">
                    <div className="order-card-header">
                      <div>
                        <strong>Order #ORD-{String(order.id).padStart(5, '0')}</strong>
                        <p>Placed on: {new Date(order.orderDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                    </div>
                    <div className="order-card-body">
                      {order.orderItems.map(item => (
                        <div key={item.id} className="order-item-detail">
                          <span>{item.productName} (x{item.quantity})</span>
                          <span>₹{item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-card-footer">
                      <span>Total Amount:</span>
                      <strong>₹{order.totalAmount.toFixed(2)}</strong>
                    </div>
                  </div>
                ))
              ) : (
                <p>You haven't placed any orders yet.</p>
              )}
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
                                <button className="delete-btn" onClick={() => handleDeleteAddress(addr.id)}><FaTrash /> Delete</button>
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
                <div className="user-avatar">{user.fullName?.charAt(0)}</div>
                <strong>{user.fullName}</strong>
                <span>{user.email}</span>
            </div>
            <nav className="profile-nav">
                <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}><FaUserEdit /> Edit Profile</button>
                <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}><FaBoxOpen /> Orders</button>
                <button onClick={() => setActiveTab('wishlist')} className={activeTab === 'wishlist' ? 'active' : ''}><FaHeart /> Wishlist</button>
                <button onClick={() => setActiveTab('addresses')} className={activeTab === 'addresses' ? 'active' : ''}><FaMapMarkerAlt /> Saved Addresses</button>
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
