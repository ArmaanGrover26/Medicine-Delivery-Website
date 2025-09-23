import React, { useState } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AddMedicineModal from './AddMedicineModal';
import EditMedicineModal from './EditMedicineModal';
import './ManageMedicines.css';

const ManageMedicines = ({ medicines, setMedicines }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddMedicine = (newMedicine) => {
    // Add a unique ID to the new medicine
    const newId = `med-${Math.random().toString(16).slice(2)}`;
    setMedicines([...medicines, { ...newMedicine, id: newId }]);
  };

  const handleUpdateMedicine = (updatedMedicine) => {
    setMedicines(medicines.map(med => 
      med.id === updatedMedicine.id ? updatedMedicine : med
    ));
    setIsEditModalOpen(false); // Close modal after update
  };

  const handleDelete = (medicineId) => {
    setMedicines(medicines.filter(med => med.id !== medicineId));
  };
  
  const handleEditClick = (medicine) => {
    setSelectedMedicine(medicine);
    setIsEditModalOpen(true);
  };

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatus = (stock) => {
    if (stock > 50) return 'In Stock';
    if (stock > 0) return 'Low Stock';
    return 'Out of Stock';
  };

  return (
    <div className="manage-medicines-container">
      <div className="manage-medicines-header">
        <div>
          <h1>Manage Medicines</h1>
          <p>Add, edit, and manage your medicine inventory</p>
        </div>
        <button className="add-medicine-button" onClick={() => setIsAddModalOpen(true)}>
          <FaPlus /> Add Medicine
        </button>
      </div>

      <div className="medicine-inventory-section">
        <div className="section-header">
          <h2>Medicine Inventory</h2>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="medicine-table-container">
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Manufacturer</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((med) => (
                <tr key={med.id}>
                  <td>{med.name}</td>
                  <td>{med.category}</td>
                  <td>${med.price}</td>
                  <td>{med.stock}</td>
                  <td>{med.manufacturer}</td>
                  <td>{med.expiryDate}</td>
                  <td>
                    <span className={`status-badge ${getStatus(med.stock).toLowerCase().replace(/\s/g, '-')}`}>
                      {getStatus(med.stock).replace(/ /g, '\u00a0')}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <FaEdit className="action-icon" onClick={() => handleEditClick(med)} />
                    <FaTrash className="action-icon trash-icon" onClick={() => handleDelete(med.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddMedicineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMedicine}
      />
      {isEditModalOpen && (
        <EditMedicineModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateMedicine}
          medicine={selectedMedicine}
        />
      )}
    </div>
  );
};

export default ManageMedicines;
