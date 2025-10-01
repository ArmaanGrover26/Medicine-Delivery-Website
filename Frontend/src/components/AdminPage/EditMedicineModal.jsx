import React, { useState, useEffect } from 'react';
import './EditMedicineModal.css';

const EditMedicineModal = ({ isOpen, onClose, onUpdate, medicine }) => {
  const [editedMedicine, setEditedMedicine] = useState({
    name: '',
    manufacturer: '',
    price: '',
    originalPrice: '',
    discount: '',
    category: '',
    subcategory: '',
    image: '',
    status: 'In Stock',
    unitsAvailable: '',
    stock: '',
    expiryDate: '',
    rxRequired: false,
    description: '',
    dosage: '',
    sideEffects: [''],
    precautions: [''],
  });

  // Use useEffect to update the form fields when a new medicine is selected for editing
  useEffect(() => {
    if (medicine) {
      setEditedMedicine({
        ...medicine,
        sideEffects: medicine.sideEffects && medicine.sideEffects.length > 0 ? medicine.sideEffects : [''],
        precautions: medicine.precautions && medicine.precautions.length > 0 ? medicine.precautions : [''],
        subcategory: medicine.subcategory || '',
        originalPrice: medicine.originalPrice || '',
        description: medicine.description || '',
        dosage: medicine.dosage || '',
        image: medicine.image || '',
        expiryDate: medicine.expiryDate || '',
        rxRequired: medicine.rxRequired || false,
        unitsAvailable: medicine.unitsAvailable || medicine.stock || '',
        stock: medicine.stock || medicine.unitsAvailable || '',
      });
    }
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedMedicine({
      ...editedMedicine,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...editedMedicine[field]];
    updatedArray[index] = value;
    setEditedMedicine({ ...editedMedicine, [field]: updatedArray });
  };

  const addArrayItem = (field) => {
    setEditedMedicine({ ...editedMedicine, [field]: [...editedMedicine[field], ''] });
  };

  const removeArrayItem = (field, index) => {
    if (editedMedicine[field].length > 1) {
      const updatedArray = editedMedicine[field].filter((_, i) => i !== index);
      setEditedMedicine({ ...editedMedicine, [field]: updatedArray });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate discount if originalPrice and price are provided
    const calculatedDiscount = editedMedicine.originalPrice && editedMedicine.price 
      ? Math.round(((editedMedicine.originalPrice - editedMedicine.price) / editedMedicine.originalPrice) * 100)
      : editedMedicine.discount;

    const medicineData = {
      ...editedMedicine,
      price: parseFloat(editedMedicine.price),
      originalPrice: editedMedicine.originalPrice ? parseFloat(editedMedicine.originalPrice) : null,
      discount: calculatedDiscount || 0,
      unitsAvailable: parseInt(editedMedicine.unitsAvailable),
      stock: parseInt(editedMedicine.unitsAvailable), // Map unitsAvailable to stock for backward compatibility
      sideEffects: editedMedicine.sideEffects.filter(item => item.trim() !== ''),
      precautions: editedMedicine.precautions.filter(item => item.trim() !== ''),
    };

    onUpdate(medicineData);
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
          {/* Basic Information */}
          <div className="form-group">
            <label>Medicine Name *</label>
            <input 
              type="text" 
              name="name" 
              value={editedMedicine.name} 
              onChange={handleChange} 
              required 
              placeholder="Enter medicine name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Manufacturer *</label>
              <input 
                type="text" 
                name="manufacturer" 
                value={editedMedicine.manufacturer} 
                onChange={handleChange} 
                required 
                placeholder="Enter manufacturer name"
              />
            </div>
          </div>

          {/* Category Information */}
          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <input 
                type="text" 
                name="category" 
                value={editedMedicine.category} 
                onChange={handleChange} 
                required 
                placeholder="e.g., Stomach Care"
              />
            </div>
            <div className="form-group">
              <label>Subcategory</label>
              <input 
                type="text" 
                name="subcategory" 
                value={editedMedicine.subcategory} 
                onChange={handleChange} 
                placeholder="e.g., Acidity"
              />
            </div>
          </div>

          {/* Pricing Information */}
          <div className="form-row">
            <div className="form-group">
              <label>Price (₹) *</label>
              <input 
                type="number" 
                name="price" 
                value={editedMedicine.price} 
                onChange={handleChange} 
                required 
                min="0"
                step="0.01"
                placeholder="Enter selling price"
              />
            </div>
            <div className="form-group">
              <label>Original Price (₹)</label>
              <input 
                type="number" 
                name="originalPrice" 
                value={editedMedicine.originalPrice} 
                onChange={handleChange} 
                min="0"
                step="0.01"
                placeholder="Enter MRP"
              />
            </div>
          </div>

          {/* Stock and Expiry */}
          <div className="form-row">
            <div className="form-group">
              <label>Units Available *</label>
              <input 
                type="number" 
                name="unitsAvailable" 
                value={editedMedicine.unitsAvailable} 
                onChange={handleChange} 
                required 
                min="0"
                placeholder="Enter stock quantity"
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input 
                type="date" 
                name="expiryDate" 
                value={editedMedicine.expiryDate} 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label>Image URL</label>
            <input 
              type="url" 
              name="image" 
              value={editedMedicine.image} 
              onChange={handleChange} 
              placeholder="Enter image URL"
            />
          </div>

          {/* Prescription Required */}
          <div className="form-group">
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="rxRequired" 
                name="rxRequired" 
                checked={editedMedicine.rxRequired} 
                onChange={handleChange} 
              />
              <label htmlFor="rxRequired">Prescription Required</label>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea 
              name="description" 
              value={editedMedicine.description} 
              onChange={handleChange} 
              required 
              placeholder="Enter medicine description"
            />
          </div>

          {/* Dosage */}
          <div className="form-group">
            <label>Dosage Instructions</label>
            <textarea 
              name="dosage" 
              value={editedMedicine.dosage} 
              onChange={handleChange} 
              placeholder="Enter dosage instructions (e.g., Adults: 2-4 tablets, as required.)"
            />
          </div>

          {/* Side Effects */}
          <div className="form-group">
            <label>Side Effects</label>
            <div className="array-input-container">
              {editedMedicine.sideEffects.map((effect, index) => (
                <div key={index} className="array-input-item">
                  <input
                    type="text"
                    value={effect}
                    onChange={(e) => handleArrayChange('sideEffects', index, e.target.value)}
                    placeholder="Enter side effect"
                  />
                  {editedMedicine.sideEffects.length > 1 && (
                    <button
                      type="button"
                      className="array-btn remove-btn"
                      onClick={() => removeArrayItem('sideEffects', index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="array-btn add-btn"
                onClick={() => addArrayItem('sideEffects')}
              >
                Add Side Effect
              </button>
            </div>
          </div>

          {/* Precautions */}
          <div className="form-group">
            <label>Precautions</label>
            <div className="array-input-container">
              {editedMedicine.precautions.map((precaution, index) => (
                <div key={index} className="array-input-item">
                  <input
                    type="text"
                    value={precaution}
                    onChange={(e) => handleArrayChange('precautions', index, e.target.value)}
                    placeholder="Enter precaution"
                  />
                  {editedMedicine.precautions.length > 1 && (
                    <button
                      type="button"
                      className="array-btn remove-btn"
                      onClick={() => removeArrayItem('precautions', index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="array-btn add-btn"
                onClick={() => addArrayItem('precautions')}
              >
                Add Precaution
              </button>
            </div>
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
