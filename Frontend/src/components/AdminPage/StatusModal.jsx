import React, { useState, useEffect } from 'react';
import './StatusModal.css';
import { FaTimes } from 'react-icons/fa';

const StatusModal = ({ isOpen, onClose, onUpdate, order }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  if (!isOpen || !order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // We pass only the status here because the parent component 
    // (AdminOrders.jsx) already knows which order is selected.
    onUpdate(status); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Update Order Status</h3>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        
        <div className="modal-body">
          <div className="order-details-summary">
            <p><strong>Order ID:</strong> #ORD-{String(order.id).padStart(5, '0')}</p>
            <p><strong>Customer:</strong> {order.shipping_name || order.customer}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="status-form">
            <label>Select New Status:</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="status-dropdown"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="save-btn">Update Status</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;