import React, { useState, useEffect } from 'react';
import './CheckoutPage.css';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { FaHome, FaPlusCircle } from 'react-icons/fa';

const CheckoutPage = () => {
  const { user, addresses, addAddress } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(addresses.length === 0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // If there are no addresses, automatically show the form
    if (addresses.length === 0) {
      setShowNewAddressForm(true);
    }
  }, [addresses]);
  
  const handleAddNewAddress = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAddress = {
        name: formData.get('name'),
        address: formData.get('address'),
        pincode: formData.get('pincode'),
        state: formData.get('state'),
        phone: formData.get('phone'),
        type: 'Home',
    };
    addAddress(newAddress);
    setShowNewAddressForm(false);
  };

  return (
    <div className="checkout-page-container">
      <Link to="/cart" className="back-to-home">
        <BsArrowLeft /> Back to Cart
      </Link>
      
      <div className="checkout-content">
        <h3>Select Delivery Address</h3>
        
        {addresses.length > 0 && (
          <div className="address-list">
            {addresses.map(addr => (
              <div
                key={addr.id}
                className={`address-card ${selectedAddress === addr.id ? 'selected' : ''}`}
                onClick={() => setSelectedAddress(addr.id)}
              >
                <div className="address-card-header">
                  <FaHome />
                  <span>{addr.type}</span>
                </div>
                <div className="address-card-body">
                  <strong>{addr.name}</strong>
                  <p>{addr.address}, {addr.state} - {addr.pincode}</p>
                  <p>Phone: {addr.phone}</p>
                </div>
              </div>
            ))}
            <button className="add-address-btn-text" onClick={() => setShowNewAddressForm(true)}>
              <FaPlusCircle /> Add a new address
            </button>
          </div>
        )}
        
        {showNewAddressForm && (
          <div className="new-address-form">
            <h4>{addresses.length > 0 ? 'Add a New Address' : 'Add your delivery address'}</h4>
            <form onSubmit={handleAddNewAddress}>
              <input name="name" type="text" placeholder="Full Name" required />
              <input name="phone" type="tel" placeholder="Phone Number" required />
              <input name="address" type="text" placeholder="House No, Building, Street, Area" required />
              <input name="pincode" type="text" placeholder="Pincode" required />
              <input name="state" type="text" placeholder="State" required />
              <button type="submit" className="action-btn">Save Address</button>
            </form>
          </div>
        )}
        
        <div className="payment-section">
          <button className="proceed-btn">Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;