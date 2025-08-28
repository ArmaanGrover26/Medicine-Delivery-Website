import React, { useState } from 'react';
import './RecentOrdersTable.css';
import { FaEye, FaEdit } from 'react-icons/fa';
import StatusModal from './StatusModal';

const ordersData = [
  { id: 'ORD-001', customer: 'John Smith', medicine: 'Paracetamol 500mg', quantity: 2, status: 'Delivered', date: '2024-12-17' },
  { id: 'ORD-002', customer: 'Sarah Johnson', medicine: 'Vitamin D3 1000IU', quantity: 1, status: 'Pending', date: '2024-12-17' },
  { id: 'ORD-003', customer: 'Michael Brown', medicine: 'Aspirin 75mg', quantity: 3, status: 'Cancelled', date: '2024-12-16' },
  { id: 'ORD-004', customer: 'Emily Davis', medicine: 'Omega-3 Fish Oil', quantity: 1, status: 'Delivered', date: '2024-12-16' },
  { id: 'ORD-005', customer: 'David Wilson', medicine: 'Calcium + Magnesium', quantity: 2, status: 'Pending', date: '2024-12-15' },
];

const RecentOrdersTable = () => {
  const [orders, setOrders] = useState(ordersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="table-container">
      <h3>Recent Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.medicine}</td>
              <td>{order.quantity}</td>
              <td>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.date}</td>
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
        onUpdate={handleUpdateStatus}
      />
    </div>
  );
};

export default RecentOrdersTable;