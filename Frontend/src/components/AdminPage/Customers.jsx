import React, { useState } from 'react';
import { FaUserPlus, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import EditCustomerModal from './EditCustomerModal';
// import AddCustomerModal from './AddCustomerModal';
import './Customers.css';

// Mock data to simulate fetching customer information
const initialCustomers = [
  { id: 'CUST-001', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 234 567 8900', address: '123 Main St, City, State 12345', totalOrders: 12, lastOrder: '2024-12-17', status: 'Active' },
  { id: 'CUST-002', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234 567 8901', address: '456 Oak Ave, City, State 12345', totalOrders: 8, lastOrder: '2024-12-17', status: 'Active' },
  { id: 'CUST-003', name: 'Michael Brown', email: 'm.brown@email.com', phone: '+1 234 567 8902', address: '789 Pine St, City, State 12345', totalOrders: 15, lastOrder: '2024-12-16', status: 'Active' },
  { id: 'CUST-004', name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1 234 567 8903', address: '321 Elm St, City, State 12345', totalOrders: 3, lastOrder: '2024-12-16', status: 'Active' },
  { id: 'CUST-005', name: 'David Wilson', email: 'd.wilson@email.com', phone: '+1 234 567 8904', address: '654 Maple Dr, City, State 12345', totalOrders: 7, lastOrder: '2024-12-15', status: 'Inactive' },
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers(customers.map(cust =>
      cust.id === updatedCustomer.id ? updatedCustomer : cust
    ));
    setIsEditModalOpen(false);
  };

  const handleAddCustomer = (newCustomer) => {
    const newId = `CUST-${Math.random().toString(16).slice(2).toUpperCase()}`;
    setCustomers([...customers, { ...newCustomer, id: newId }]);
    setIsAddModalOpen(false);
  };

  const handleDelete = (customerId) => {
    setCustomers(customers.filter(cust => cust.id !== customerId));
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
  };
  
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // New: Calculate dynamic values for summary cards
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);
  const averageOrders = totalCustomers > 0 ? (totalOrders / totalCustomers).toFixed(1) : '0';

  return (
    <div className="customers-container">
      <div className="customers-header">
        <div>
          <h1>Customers</h1>
          <p>Manage customer accounts and information</p>
        </div>
      </div>

      <div className="customers-summary">
        <div className="summary-card">
          <div className="card-content">
            <p className="summary-title">Total Customers</p>
            <h2 className="summary-value">{totalCustomers}</h2>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-content">
            <p className="summary-title">Active Customers</p>
            <h2 className="summary-value">{activeCustomers}</h2>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-content">
            <p className="summary-title">Average Orders</p>
            <h2 className="summary-value">{averageOrders}</h2>
          </div>
        </div>
      </div>

      <div className="customer-list-section">
        <div className="section-header">
          <h2>Customer List</h2>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>
        <div className="customer-table-container">
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Total Orders</th>
                <th>Last Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td className="contact-cell">
                    <p>{customer.email}</p>
                    <p>{customer.phone}</p>
                  </td>
                  <td className="address-cell">{customer.address}</td>
                  <td>{customer.totalOrders}</td>
                  <td>{customer.lastOrder}</td>
                  <td>
                    <span className={`status-badge ${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <FaEdit className="action-icon" onClick={() => handleEditClick(customer)} />
                    <FaTrash className="action-icon trash-icon" onClick={() => handleDelete(customer.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && (
        <EditCustomerModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateCustomer}
          customer={selectedCustomer}
        />
      )}
      {isAddModalOpen && (
        <AddCustomerModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onAdd={handleAddCustomer}
        />
      )}
    </div>
  );
};

export default Customers;
