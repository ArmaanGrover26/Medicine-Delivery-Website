import React from 'react';
import TopCards from './TopCards';
import RecentOrdersTable from './RecentOrdersTable';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your medicine delivery admin panel</p>
      </div>
      <TopCards />
      <RecentOrdersTable />
    </div>
  );
};

export default Dashboard;