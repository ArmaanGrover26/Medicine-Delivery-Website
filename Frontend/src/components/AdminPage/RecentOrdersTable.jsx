import React, { useState } from 'react';
import './RecentOrdersTable.css';
import { FaEdit } from 'react-icons/fa';
import StatusModal from './StatusModal';

// This component now accepts 'orders' as a prop from its parent (the Dashboard).
// It no longer has its own mock data.
const RecentOrdersTable = ({ orders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Note: The status update logic will be handled on the main "Orders" page,
  // not on this dashboard summary table. This modal is kept for UI consistency.
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handlePlaceholderUpdate = () => {
    alert("To update status, please go to the main 'Orders' page.");
    handleCloseModal();
  }

  return (
    <div className="table-container">
      <h3>Recent Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Products</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* We now map over the 'orders' prop passed from the Dashboard */}
          {orders.map((order) => (
            <tr key={order.id}>
              {/* The data fields are updated to match your real backend data structure */}
              <td>#ORD-{String(order.id).padStart(5, '0')}</td>
              <td>{order.shippingName}</td>
              <td>
                {order.orderItems[0]?.productName}
                {order.orderItems.length > 1 && ` (+${order.orderItems.length - 1})`}
              </td>
              <td>
                <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                  {order.status}
                </span>
              </td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td className="actions-cell">
                <FaEdit className="action-icon" onClick={() => handleEditClick(order)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <StatusModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        // This now calls a placeholder function as the main logic is on the Orders page
        onUpdate={handlePlaceholderUpdate}
      />
    </div>
  );
};

export default RecentOrdersTable;
