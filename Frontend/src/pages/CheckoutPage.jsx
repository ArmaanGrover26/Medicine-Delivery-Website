import React, { useState, useEffect } from 'react';
import './CheckoutPage.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { FaHome, FaPlusCircle } from 'react-icons/fa';

const CheckoutPage = () => {
    // We get the addresses array AND the function to refresh it from the context
    const { user, addresses, addAddress, fetchAddresses } = useAuth();
    const { setShippingAddress } = useCart();
    const navigate = useNavigate();

    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    
    // --- NEW: State to manage loading and errors for this specific page ---
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newAddressFields, setNewAddressFields] = useState({
        name: '', phone: '', address: '', pincode: '', state: '',
    });

    // This useEffect is now the single source of truth for loading this page's data.
    useEffect(() => {
        window.scrollTo(0, 0);

        // This ensures that even if we navigate to the page quickly,
        // we always try to get the latest address list.
        fetchAddresses()
            .catch(err => {
                console.error("Checkout page failed to fetch addresses:", err);
                setError("Could not load your saved addresses. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
        
        // Pre-fill the name from the user object if it exists
        if (user) {
            setNewAddressFields(prev => ({ ...prev, name: user.fullName || '' }));
        }
    }, [user]); // Reruns if the user object changes (e.g., on login)

    // This useEffect reacts to changes in the addresses list from the context.
    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            const defaultAddress = addresses[0];
            setSelectedAddressId(defaultAddress.id);
            setShippingAddress(defaultAddress);
            setShowNewAddressForm(false);
        } else if (addresses.length === 0) {
            setShowNewAddressForm(true);
        }
    }, [addresses, selectedAddressId, setShippingAddress]);
    
    const handleAddressSelect = (address) => {
        setSelectedAddressId(address.id);
        setShippingAddress(address);
    };

    const handleNewAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddressFields(prev => ({ ...prev, [name]: value }));
    };

    const handleAddNewAddress = async (e) => {
        e.preventDefault();
        const newAddressData = { ...newAddressFields, type: 'Home' };

        try {
            // addAddress in the context already calls fetchAddresses for us,
            // which will trigger the second useEffect to update our selection.
            await addAddress(newAddressData);
            // Reset form fields after successful submission
            setNewAddressFields({ name: user.fullName || '', phone: '', address: '', pincode: '', state: '' });
        } catch (error) {
            alert(`Error adding address: ${error.message}`);
        }
    };

    // --- NEW: A dedicated function to render the address list based on state ---
    const renderAddressContent = () => {
        if (isLoading) {
            return <p>Loading addresses...</p>;
        }
        if (error) {
            return <p style={{ color: 'red' }}>{error}</p>;
        }
        if (addresses.length > 0) {
            return (
                <div className="address-list">
                    {addresses.map(addr => (
                        <div key={addr.id} className={`address-card ${selectedAddressId === addr.id ? 'selected' : ''}`} onClick={() => handleAddressSelect(addr)}>
                            <div className="address-card-header"><FaHome /><span>{addr.type}</span></div>
                            <div className="address-card-body">
                                <strong>{addr.name}</strong>
                                <p>{addr.address}, {addr.state} - {addr.pincode}</p>
                                <p>Phone: {addr.phone}</p>
                            </div>
                        </div>
                    ))}
                    {!showNewAddressForm && (
                        <button className="add-address-btn-text" onClick={() => setShowNewAddressForm(true)}>
                            <FaPlusCircle /> Add a new address
                        </button>
                    )}
                </div>
            );
        }
        // If there are no addresses and it's not loading/error, we show nothing here,
        // because the form will be shown below.
        return null;
    };

    return (
        <div className="checkout-page-container">
            <Link to="/cart" className="back-to-home"><BsArrowLeft /> Back to Cart</Link>
            
            <div className="checkout-content">
                <h3>Select Delivery Address</h3>
                
                {renderAddressContent()}
                
                {showNewAddressForm && (
                    <div className="new-address-form">
                        <h4>{addresses.length > 0 ? 'Add a New Address' : 'Add your delivery address'}</h4>
                        <form onSubmit={handleAddNewAddress}>
                            <input name="name" type="text" placeholder="Full Name" value={newAddressFields.name} onChange={handleNewAddressChange} required />
                            <input name="phone" type="tel" placeholder="Phone Number" value={newAddressFields.phone} onChange={handleNewAddressChange} required />
                            <input name="address" type="text" placeholder="House No, Building, Street, Area" value={newAddressFields.address} onChange={handleNewAddressChange} required />
                            <input name="pincode" type="text" placeholder="Pincode" value={newAddressFields.pincode} onChange={handleNewAddressChange} required />
                            <input name="state" type="text" placeholder="State" value={newAddressFields.state} onChange={handleNewAddressChange} required />
                            <button type="submit" className="action-btn">Save Address</button>
                        </form>
                    </div>
                )}
                
                <div className="payment-section">
                    <button 
                        className={`proceed-btn ${!selectedAddressId ? 'disabled' : ''}`}
                        disabled={!selectedAddressId}
                        onClick={() => navigate('/payment')}
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
