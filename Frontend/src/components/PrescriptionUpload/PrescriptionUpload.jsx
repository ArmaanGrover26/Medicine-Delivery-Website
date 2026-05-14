import React from 'react';
import './PrescriptionUpload.css';
import { FaUpload } from 'react-icons/fa';
import { BsFileEarmarkMedicalFill } from 'react-icons/bs';

const PrescriptionUpload = () => {
  return (
    <div className="prescription-container">
      <div className="prescription-left">
        <BsFileEarmarkMedicalFill className="prescription-icon" />
        <h3>Order with Prescription</h3>
        <p>Upload a prescription and we will deliver your medicines.</p>
        <button className="upload-btn">
          <FaUpload /> Upload
        </button>
      </div>
      <div className="prescription-right">
        <h4>How does this work?</h4>
        <ol className="steps-list">
          <li>Upload a photo of your prescription</li>
          <li>Add delivery address and place the order</li>
          <li>Now, sit back! Your medicines will get delivered at your doorstep</li>
        </ol>
      </div>
    </div>
  );
};

export default PrescriptionUpload;