import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API calls
import TopCards from './TopCards';
import RecentOrdersTable from './RecentOrdersTable';
import './Dashboard.css';

// The base URL for your admin API endpoints
const API_BASE_URL = 'http://localhost:8080/api/admin';

const Dashboard = () => {
  // State to hold the live data from the backend
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // This useEffect hook runs once when the component is first loaded
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // We use Promise.all to make both API calls at the same time for efficiency.
        // We assume the admin is logged in and the JWT is sent by the axios interceptor.
        const [ordersResponse, usersResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/orders`),
          axios.get(`${API_BASE_URL}/users`)
        ]);
        
        setOrders(ordersResponse.data);
        setUsers(usersResponse.data);

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load dashboard data. Please ensure you are logged in as an admin.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // The empty array [] means this effect runs only once

  // --- Live Data Calculations ---
  
  // Calculate total revenue from the fetched orders
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2);
  
  // Get the total number of customers (users)
  const totalCustomers = users.length;
  
  // Sort orders by date (most recent first) and take the last 4
  const recentOrders = orders
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 4);

  if (isLoading) {
    return <div className="dashboard-container"><p>Loading dashboard...</p></div>;
  }

  if (error) {
    return <div className="dashboard-container"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your medicine delivery admin panel</p>
      </div>
      <TopCards
        totalOrders={orders.length}
        totalRevenue={totalRevenue}
        totalCustomers={totalCustomers}
        // You can add a 'medicines' endpoint later to get a real out-of-stock count
        outOfStock={0} 
      />
      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
};

export default Dashboard;
