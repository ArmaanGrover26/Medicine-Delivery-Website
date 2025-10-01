import React, { useState, useEffect } from 'react';
import './StatusModal.css';

const StatusModal = ({ order, isOpen, onClose, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(order.id, selectedStatus);
    }
    onClose();
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
            <p className="detail-value">{order.id}</p>
            <p><strong>Customer</strong></p>
            <p className="detail-value">{order.customer}</p>
          </div>
          <div className="status-selection">
            <p>Select New Status</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Pending"
                  checked={selectedStatus === 'Pending'}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                <span className="radio-label pending">Pending</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="Delivered"
                  checked={selectedStatus === 'Delivered'}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                <span className="radio-label delivered">Delivered</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="Cancelled"
                  checked={selectedStatus === 'Cancelled'}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                <span className="radio-label cancelled">Cancelled</span>
              </label>
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
