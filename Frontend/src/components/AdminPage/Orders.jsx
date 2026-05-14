import React, { useState, useEffect } from 'react';
import { FaEdit, FaSearch, FaBoxOpen, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import StatusModal from './StatusModal';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Orders from Backend
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. Update Order Status Function
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the local state immediately so the UI reflects the change
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        setIsModalOpen(false);
      } else {
        alert("Failed to update status in database.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Server error while updating status.");
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
  
  // 3. Filter Logic (Search & Status)
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    
    // We check shipping_name, email, and order ID
    const matchesSearch = 
      (order.shipping_name && order.shipping_name.toLowerCase().includes(searchLower)) ||
      (order.email && order.email.toLowerCase().includes(searchLower)) ||
      String(order.id).includes(searchLower);
      
    const matchesStatus = statusFilter === 'All Status' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="orders-container"><p className="loading-text">Loading orders...</p></div>;

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
            <div className="searchh-bar">
              <FaSearch className="searchh-icon" />
              <input 
                type="text" 
                placeholder="Search by Name, Email or ID..." 
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
                <th>Customer Info</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">#ORD-{String(order.id).padStart(5, '0')}</td>
                  <td>
                    <div className="customer-info">
                        <strong>{order.shipping_name}</strong>
                        <span>{order.email}</span>
                    </div>
                  </td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="order-total">₹{Number(order.total_amount).toFixed(2)}</td>
                  <td>
                    {/* This class name logic converts "Out for Delivery" to "out-for-delivery" for CSS */}
                    <span className={`status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <FaEdit 
                      className="action-icon edit-icon" 
                      title="Edit Status"
                      onClick={() => handleEditClick(order)} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <p className="no-data">No orders found.</p>
          )}
        </div>
      </div>
      
      {/* Status Modal */}
      {isModalOpen && selectedOrder && (
        <StatusModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          // We wrap the handler to pass the ID internally
          onUpdate={(newStatus) => handleUpdateStatus(selectedOrder.id, newStatus)}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default Orders;