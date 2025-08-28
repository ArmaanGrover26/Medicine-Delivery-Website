import React, { useState, useEffect } from 'react';
import './EditMedicineModal.css';

const EditMedicineModal = ({ isOpen, onClose, onUpdate, medicine }) => {
  const [editedMedicine, setEditedMedicine] = useState(medicine);

  // Use useEffect to update the form fields when a new medicine is selected for editing
  useEffect(() => {
    if (medicine) {
      setEditedMedicine(medicine);
    }
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMedicine({ ...editedMedicine, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedMedicine);
    onClose();
  };

  if (!isOpen || !medicine) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Medicine</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Medicine Name</label>
            <input type="text" name="name" value={editedMedicine.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={editedMedicine.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price ($)</label>
            <input type="number" name="price" value={editedMedicine.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" value={editedMedicine.stock} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Manufacturer</label>
            <input type="text" name="manufacturer" value={editedMedicine.manufacturer} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input type="date" name="expiryDate" value={editedMedicine.expiryDate} onChange={handleChange} required />
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="update-button">Update Medicine</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMedicineModal;
