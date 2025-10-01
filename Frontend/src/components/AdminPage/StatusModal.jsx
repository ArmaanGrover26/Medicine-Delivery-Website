import React, { useState, useEffect } from 'react';
import './StatusModal.css';

// --- THIS IS THE FIX ---
// We define a complete, definitive list of all possible order statuses.
const STATUS_OPTIONS = [
  'Pending',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

const StatusModal = ({ order, isOpen, onClose, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState('');

  // When the modal opens or the selected order changes,
  // set the initial state to the order's current status.
  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);

  const handleUpdate = () => {
    if (onUpdate) {
      // Call the onUpdate function passed from the parent (Orders.jsx)
      onUpdate(order.id, selectedStatus);
    }
    onClose(); // Close the modal after updating
  };

  if (!isOpen || !order) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Update Order Status</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="order-details">
            <p><strong>Order ID</strong></p>
            {/* Display the formatted Order ID */}
            <p className="detail-value">#ORD-{String(order.id).padStart(5, '0')}</p>
            <p><strong>Customer</strong></p>
            {/* CORRECTED: Use `shippingName` to match your live data */}
            <p className="detail-value">{order.shippingName}</p>
          </div>
          <div className="status-selection">
            <p>Select New Status</p>
            <div className="radio-group">
              {/* We now map over the complete STATUS_OPTIONS array to create the radio buttons */}
              {STATUS_OPTIONS.map(status => (
                <label key={status}>
                  <input
                    type="radio"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />
                  {/* The span's class is now dynamic to match the status */}
                  <span className={`radio-label ${status.toLowerCase().replace(' ', '-')}`}>
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="update-button" onClick={handleUpdate}>Update Status</button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;

