import React from 'react';
import TopCards from './TopCards';
import RecentOrdersTable from './RecentOrdersTable';
import './Dashboard.css';

const Dashboard = ({ orders, medicines }) => {
  // Calculate summary data from props
  const totalOrders = orders.length;
  const outOfStock = medicines.filter(med => med.stock === 0).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0).toFixed(2);
  const totalCustomers = [...new Set(orders.map(order => order.customer))].length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your medicine delivery admin panel</p>
      </div>
      <TopCards
        totalOrders={totalOrders}
        outOfStock={outOfStock}
        totalRevenue={totalRevenue}
        totalCustomers={totalCustomers}
      />
      <RecentOrdersTable orders={orders} />
    </div>
  );
};

export default Dashboard;
