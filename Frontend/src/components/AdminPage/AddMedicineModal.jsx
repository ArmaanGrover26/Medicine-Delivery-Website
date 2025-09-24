import React, { useState } from 'react';
import './AddMedicineModal.css';

const AddMedicineModal = ({ isOpen, onClose, onAdd }) => {
  const [medicine, setMedicine] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedicine({
      ...medicine,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...medicine[field]];
    updatedArray[index] = value;
    setMedicine({ ...medicine, [field]: updatedArray });
  };

  const addArrayItem = (field) => {
    setMedicine({ ...medicine, [field]: [...medicine[field], ''] });
  };

  const removeArrayItem = (field, index) => {
    if (medicine[field].length > 1) {
      const updatedArray = medicine[field].filter((_, i) => i !== index);
      setMedicine({ ...medicine, [field]: updatedArray });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate discount if originalPrice and price are provided
    const calculatedDiscount = medicine.originalPrice && medicine.price 
      ? Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)
      : medicine.discount;

    const medicineData = {
      ...medicine,
      price: parseFloat(medicine.price),
      originalPrice: medicine.originalPrice ? parseFloat(medicine.originalPrice) : null,
      discount: calculatedDiscount || 0,
      unitsAvailable: parseInt(medicine.unitsAvailable),
      stock: parseInt(medicine.unitsAvailable), // Map unitsAvailable to stock for backward compatibility
      sideEffects: medicine.sideEffects.filter(item => item.trim() !== ''),
      precautions: medicine.precautions.filter(item => item.trim() !== ''),
    };

    onAdd(medicineData);
    onClose();
    
    // Reset form after submission
    setMedicine({
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
          {/* Basic Information */}
          <div className="form-group">
            <label>Medicine Name *</label>
            <input 
              type="text" 
              name="name" 
              value={medicine.name} 
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
                value={medicine.manufacturer} 
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
                value={medicine.category} 
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
                value={medicine.subcategory} 
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
                value={medicine.price} 
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
                value={medicine.originalPrice} 
                onChange={handleChange} 
                min="0"
                step="0.01"
                placeholder="Enter MRP"
              />
            </div>
          </div>

          {/* Stock and Image */}
          <div className="form-row">
            <div className="form-group">
              <label>Units Available *</label>
              <input 
                type="number" 
                name="unitsAvailable" 
                value={medicine.unitsAvailable} 
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
                value={medicine.expiryDate} 
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
              value={medicine.image} 
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
                checked={medicine.rxRequired} 
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
              value={medicine.description} 
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
              value={medicine.dosage} 
              onChange={handleChange} 
              placeholder="Enter dosage instructions (e.g., Adults: 2-4 tablets, as required.)"
            />
          </div>

          {/* Side Effects */}
          <div className="form-group">
            <label>Side Effects</label>
            <div className="array-input-container">
              {medicine.sideEffects.map((effect, index) => (
                <div key={index} className="array-input-item">
                  <input
                    type="text"
                    value={effect}
                    onChange={(e) => handleArrayChange('sideEffects', index, e.target.value)}
                    placeholder="Enter side effect"
                  />
                  {medicine.sideEffects.length > 1 && (
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
              {medicine.precautions.map((precaution, index) => (
                <div key={index} className="array-input-item">
                  <input
                    type="text"
                    value={precaution}
                    onChange={(e) => handleArrayChange('precautions', index, e.target.value)}
                    placeholder="Enter precaution"
                  />
                  {medicine.precautions.length > 1 && (
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
            <button type="submit" className="add-button">Add Medicine</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;
