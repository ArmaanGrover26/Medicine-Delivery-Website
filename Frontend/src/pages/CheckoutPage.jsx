import React, { useState, useEffect } from 'react';
import './CheckoutPage.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // 1. Import useCart
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { FaHome, FaPlusCircle } from 'react-icons/fa';

const CheckoutPage = () => {
  const { user, addresses, addAddress } = useAuth();
  const { setShippingAddress } = useCart(); // 2. Get the function from CartContext
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Don't auto-select any address - let user choose
    if (!addresses || addresses.length === 0) {
      setShowNewAddressForm(true);
    }
  }, [addresses]);

  const handleAddressSelect = (address) => {
    setSelectedAddressId(address.id);
    setShippingAddress(address); // 3. Save the selected address to the CartContext
  };

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAddressData = {
      fullName: formData.get('fullName'),
      phoneNumber: formData.get('phoneNumber'),
      addressLine: formData.get('addressLine'),
      pincode: formData.get('pincode'),
      state: formData.get('state'),
      addressType: 'Home',
    };
    try {
      const newlyAddedAddress = await addAddress(newAddressData);
      if (newlyAddedAddress) {
        handleAddressSelect(newlyAddedAddress); // Select the new address
        setShowNewAddressForm(false);
        e.target.reset();
        alert('Address saved successfully!');
      }
    } catch (error) {
      console.error('Failed to add address:', error);
      if (error.message && error.message.includes('Token is not valid')) {
        alert('Your session has expired. Please log out and log back in to continue.');
      } else {
        alert('Failed to add address: ' + (error.message || 'Please try again'));
      }
    }
  };

  return (
    <div className="checkout-page-container">
      <Link to="/cart" className="back-to-home">
        <BsArrowLeft /> Back to Cart
      </Link>

      <div className="checkout-content">
        <h3>Select Delivery Address</h3>

        {addresses && addresses.length > 0 && (
          <div className="address-list">
            {addresses.map(addr => (
              <div
                key={addr.id}
                className={`address-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                onClick={() => handleAddressSelect(addr)}
              >
                <div className="address-card-header">
                  <FaHome />
                  <span>{addr.address_type || 'Home'}</span>
                </div>
                <div className="address-card-body">
                  <strong>{addr.full_name}</strong>
                  <p>{addr.address_line}, {addr.state} - {addr.pincode}</p>
                  <p>Phone: {addr.phone_number}</p>
                </div>
              </div>
            ))}
            {!showNewAddressForm && (
              <button className="add-address-btn-text" onClick={() => setShowNewAddressForm(true)}>
                <FaPlusCircle /> Add a new address
              </button>
            )}
          </div>
        )}

        {showNewAddressForm && (
          <div className="new-address-form">
            <h4>{addresses && addresses.length > 0 ? 'Add a New Address' : 'Add your delivery address'}</h4>
            <form onSubmit={handleAddNewAddress}>
              <input name="fullName" type="text" placeholder="Full Name" defaultValue={user?.name} required />
              <input name="phoneNumber" type="tel" placeholder="Phone Number" required />
              <input name="addressLine" type="text" placeholder="House No, Building, Street, Area" required />
              <input name="pincode" type="text" placeholder="Pincode" required />
              <input name="state" type="text" placeholder="State" required />
              <button type="submit" className="action-btn">Save Address</button>
            </form>
          </div>
        )}

        <div className="payment-section">
          <Link
            to="/payment"
            className={`proceed-btn ${!selectedAddressId ? 'disabled' : ''}`}
            onClick={(e) => { if (!selectedAddressId) e.preventDefault(); }}
          >
            Proceed to Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;