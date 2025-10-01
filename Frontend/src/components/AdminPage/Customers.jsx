import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaUserSlash, FaUserCheck } from 'react-icons/fa';
import './Customers.css';
import axios from 'axios'; // Import axios

const API_URL = 'http://localhost:8080/api/admin/users';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch all users from the backend
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setCustomers(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  // Fetch customers when the component first loads
  useEffect(() => {
    fetchCustomers();
  }, []);

  // REUSABLE function to handle updating a user's status
  const handleUpdateStatus = async (customerId, isBlocked) => {
    try {
      // Use the new single endpoint with a query parameter
      await axios.put(`${API_URL}/${customerId}/status`, null, { 
        params: { blocked: isBlocked } 
      });
      // Update the user's status in the local state for an immediate UI update
      setCustomers(customers.map(cust => 
        cust.id === customerId ? { ...cust, blocked: isBlocked } : cust
      ));
    } catch (err) {
      alert(`Failed to ${isBlocked ? 'block' : 'unblock'} user.`);
    }
  };
  
  // Filter customers based on the correct property name: fullName
  const filteredCustomers = customers.filter(customer =>
    customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate summary based on the correct property name: blocked
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => !c.blocked).length;
  
  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="customers-container">
      {/* ... a large part of the JSX is unchanged ... */}
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
            <h2 className="summary-value">N/A</h2> {/* This would require more data */}
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
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>CUST-{String(customer.id).padStart(3, '0')}</td>
                  {/* Use the correct property name: fullName */}
                  <td>{customer.fullName}</td>
                  <td className="contact-cell">
                    <p>{customer.email}</p>
                  </td>
                  <td>
                    {/* Use the correct property name: blocked */}
                    <span className={`status-badge ${customer.blocked ? 'blocked' : 'active'}`}>
                      {customer.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {/* Use the correct property name: blocked */}
                    {customer.blocked ? (
                      <FaUserCheck className="action-icon unblock-icon" title="Unblock User" onClick={() => handleUpdateStatus(customer.id, false)} />
                    ) : (
                      <FaUserSlash className="action-icon block-icon" title="Block User" onClick={() => handleUpdateStatus(customer.id, true)} />
                    )}
                    <FaTrash className="action-icon trash-icon" title="Delete User" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;