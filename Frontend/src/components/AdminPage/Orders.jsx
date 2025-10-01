import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API calls
import { FaEdit, FaSearch } from 'react-icons/fa';
import StatusModal from './StatusModal';
import './Orders.css';

// The base URL for your backend API
const API_BASE_URL = 'http://localhost:8080/api/admin';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // --- NEW: Function to fetch all orders from the backend ---
  const fetchAllOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // We assume the admin is already logged in and the JWT token
      // is being sent automatically by the axios interceptor in AuthContext.
      const response = await axios.get(`${API_BASE_URL}/orders`);
      setOrders(response.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Could not load orders. Please ensure you are logged in as an admin and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- NEW: Fetch orders when the component first loads ---
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // --- UPDATED: This function now calls the backend API ---
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // Call the PUT endpoint to update the status
      await axios.put(`${API_BASE_URL}/orders/${orderId}/status`, { status: newStatus });
      // After a successful update, refresh the list to show the change
      await fetchAllOrders();
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update status. Please try again.");
    }
  };
  
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  
  // --- UPDATED: Filter logic now works with the real data structure ---
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
        order.shippingName.toLowerCase().includes(searchLower) ||
        String(order.id).includes(searchLower) ||
        // Search through all product names in the order
        order.orderItems.some(item => item.productName.toLowerCase().includes(searchLower));

    const matchesStatus = statusFilter === 'All Status' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderTableContent = () => {
    if (isLoading) {
      return <tr><td colSpan="8" style={{ textAlign: 'center' }}>Loading orders...</td></tr>;
    }
    if (error) {
      return <tr><td colSpan="8" style={{ textAlign: 'center', color: 'red' }}>{error}</td></tr>;
    }
    if (filteredOrders.length === 0) {
      return <tr><td colSpan="8" style={{ textAlign: 'center' }}>No orders found.</td></tr>;
    }
    return filteredOrders.map((order) => (
      <tr key={order.id}>
        <td>#ORD-{String(order.id).padStart(5, '0')}</td>
        <td>{order.shippingName}</td>
        <td>
          {/* Display the first product name, and a note if there are more */}
          {order.orderItems[0]?.productName}
          {order.orderItems.length > 1 && ` (+${order.orderItems.length - 1} more)`}
        </td>
        <td>{order.orderItems.reduce((total, item) => total + item.quantity, 0)}</td>
        <td>₹{order.totalAmount.toFixed(2)}</td>
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
    ));
  };

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
                placeholder="Search by ID, customer, or product..." 
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
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
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
                <th>Products</th>
                <th>Total Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {renderTableContent()}
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
