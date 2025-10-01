import React, { useState } from 'react';
import './AddMedicineModal.css';

const AddMedicineModal = ({ isOpen, onClose, onAdd }) => {
  const [medicine, setMedicine] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    manufacturer: '',
    expiryDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(medicine);
    onClose();
    // Reset form after submission
    setMedicine({
      name: '',
      category: '',
      price: '',
      stock: '',
      manufacturer: '',
      expiryDate: '',
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Medicine</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Medicine Name</label>
            <input type="text" name="name" value={medicine.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={medicine.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price ($)</label>
            <input type="number" name="price" value={medicine.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" value={medicine.stock} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Manufacturer</label>
            <input type="text" name="manufacturer" value={medicine.manufacturer} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input type="date" name="expiryDate" value={medicine.expiryDate} onChange={handleChange} required />
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="add-button">Add Medicine</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;
