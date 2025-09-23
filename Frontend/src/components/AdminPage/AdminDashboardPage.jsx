import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ManageMedicines from './ManageMedicines';
import Orders from './Orders';
import Customers from './Customers';
// import './AdminDashboardPage.css';

// Mock data to simulate an API response for orders
const initialOrders = [
  { id: 'ORD-001', customer: 'John Smith', medicine: 'Paracetamol 500mg', quantity: 2, total: 24.99, status: 'Delivered', date: '2024-12-17' },
  { id: 'ORD-002', customer: 'Sarah Johnson', medicine: 'Vitamin D3 1000IU', quantity: 1, total: 15.99, status: 'Pending', date: '2024-12-17' },
  { id: 'ORD-003', customer: 'Michael Brown', medicine: 'Aspirin 75mg', quantity: 3, total: 18.75, status: 'Cancelled', date: '2024-12-16' },
  { id: 'ORD-004', customer: 'Emily Davis', medicine: 'Omega-3 Fish Oil', quantity: 1, total: 29.99, status: 'Delivered', date: '2024-12-16' },
  { id: 'ORD-005', customer: 'David Wilson', medicine: 'Calcium + Magnesium', quantity: 2, total: 34.98, status: 'Pending', date: '2024-12-15' },
];

// Mock data to simulate an API response for medicines
const initialMedicines = [
  { id: 'med-001', name: 'Paracetamol 500mg', category: 'Pain Relief', price: 12.99, stock: 150, manufacturer: 'PharmaCorp', expiryDate: '2026-08-15' },
  { id: 'med-002', name: 'Vitamin D3 1000IU', category: 'Vitamins', price: 15.99, stock: 8, manufacturer: 'HealthPlus', expiryDate: '2025-12-20' },
  { id: 'med-003', name: 'Aspirin 75mg', category: 'Cardiovascular', price: 6.25, stock: 0, manufacturer: 'MediCore', expiryDate: '2025-10-30' },
  { id: 'med-004', name: 'Omega-3 Fish Oil', category: 'Supplements', price: 29.99, stock: 45, manufacturer: 'NaturaLife', expiryDate: '2026-03-12' },
];

const initialCustomers = [
  { id: 'CUST-001', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 234 567 8900', address: '123 Main St, City, State 12345', totalOrders: 12, lastOrder: '2024-12-17', status: 'Active' },
  { id: 'CUST-002', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234 567 8901', address: '456 Oak Ave, City, State 12345', totalOrders: 8, lastOrder: '2024-12-17', status: 'Active' },
  { id: 'CUST-003', name: 'Michael Brown', email: 'm.brown@email.com', phone: '+1 234 567 8902', address: '789 Pine St, City, State 12345', totalOrders: 15, lastOrder: '2024-12-16', status: 'Active' },
  { id: 'CUST-004', name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1 234 567 8903', address: '321 Elm St, City, State 12345', totalOrders: 3, lastOrder: '2024-12-16', status: 'Active' },
  { id: 'CUST-005', name: 'David Wilson', email: 'd.wilson@email.com', phone: '+1 234 567 8904', address: '654 Maple Dr, City, State 12345', totalOrders: 7, lastOrder: '2024-12-15', status: 'Inactive' },
];

function AdminDashboardPage() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [orders, setOrders] = useState(initialOrders);
  const [medicines, setMedicines] = useState(initialMedicines);
  const [customers, setCustomers] = useState(initialCustomers);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard orders={orders} medicines={medicines} />;
      case 'manage-medicines':
        return <ManageMedicines medicines={medicines} setMedicines={setMedicines} />;
      case 'orders':
        return <Orders orders={orders} setOrders={setOrders} />;
      case 'customers':
        return <Customers customers={customers} setCustomers={setCustomers} />;
      default:
        return <Dashboard orders={orders} medicines={medicines} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default AdminDashboardPage;
