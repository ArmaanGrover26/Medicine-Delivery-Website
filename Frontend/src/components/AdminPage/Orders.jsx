import React, { useState } from 'react';
import { FaEye, FaEdit, FaSearch, FaFileExport } from 'react-icons/fa';
import StatusModal from './StatusModal';
import './Orders.css';

// This is our mock data for the orders.
const initialOrders = [
  { id: 'ORD-001', customer: 'John Smith', medicine: 'Paracetamol 500mg', quantity: 2, total: 24.99, status: 'Delivered', date: '2024-12-17' },
  { id: 'ORD-002', customer: 'Sarah Johnson', medicine: 'Vitamin D3 1000IU', quantity: 1, total: 15.99, status: 'Pending', date: '2024-12-17' },
  { id: 'ORD-003', customer: 'Michael Brown', medicine: 'Aspirin 75mg', quantity: 3, total: 18.75, status: 'Cancelled', date: '2024-12-16' },
  { id: 'ORD-004', customer: 'Emily Davis', medicine: 'Omega-3 Fish Oil', quantity: 1, total: 29.99, status: 'Delivered', date: '2024-12-16' },
  { id: 'ORD-005', customer: 'David Wilson', medicine: 'Calcium + Magnesium', quantity: 2, total: 34.98, status: 'Pending', date: '2024-12-15' },
  { id: 'ORD-006', customer: 'Lisa Anderson', medicine: 'Iron Supplement', quantity: 1, total: 22.50, status: 'Delivered', date: '2024-12-14' },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };
  
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div>
          <h1>Orders</h1>
          <p>View and manage all customer orders</p>
        </div>
      </div>
      <div className="orders-section">
        <div className="section-header">
          <h2>All Orders</h2>
          <div className="filters">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            <select
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Delivered</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
        <div className="orders-table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.medicine}</td>
                  <td>{order.quantity}</td>
                  <td>${order.total}</td>
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
        </div>
      </div>
      <StatusModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdateStatus}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
