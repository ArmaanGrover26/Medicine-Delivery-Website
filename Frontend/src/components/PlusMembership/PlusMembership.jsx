import React from 'react';

// --- SVG Icons (replaces react-icons) ---
const FaPercentage = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M57.37 39.37C25.68 71.06 25.68 120.9 57.37 152.6L192.6 287.1c-27.42 18.28-44.48 49.33-44.48 83.33C148.1 435.6 196.4 484.1 259.9 484.1c63.49 0 111.8-48.51 111.8-111.8c0-33.16-16.14-63.51-42.7-82.02L391.3 152.6c31.69-31.69 31.69-81.54 0-113.2C359.6 7.684 309.8 7.684 278.1 39.37L57.37 39.37zM111.8 111.8c-12.27 0-22.36-10.09-22.36-22.36c0-12.27 10.09-22.36 22.36-22.36c12.27 0 22.36 10.09 22.36 22.36C134.2 101.7 124.1 111.8 111.8 111.8zM259.9 439.6c-35.19 0-63.81-28.62-63.81-63.81s28.62-63.81 63.81-63.81s63.81 28.62 63.81 63.81S295.1 439.6 259.9 439.6zM335.5 134.2c-12.27 0-22.36-10.09-22.36-22.36s10.09-22.36 22.36-22.36c12.27 0 22.36 10.09 22.36 22.36S347.8 134.2 335.5 134.2z"></path></svg>
);
const FaFlask = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M448 384h-32v-64h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H64a16 16 0 0 0-16 16v288a16 16 0 0 0 16 16h32v64H64a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h384a16 16 0 0 0 16-16v-96a16 16 0 0 0-16-16zM112 256H96V64h320v192H112zm80 128h128v64H192v-64z"></path></svg>
);
const FaShippingFast = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256zM48 48h320v208H48V48z"></path></svg>
);
const FaPlusCircle = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
);


const PlusMembership = () => {
  return (
    <>
      <style>{`
        .plus-membership-section {
          padding: 4rem 2rem;
          background-color: #f8f9fa; /* var(--background-medium) */
        }
        .plus-membership-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }
        .plus-header {
          background-color: #eaf5ff;
          padding: 3rem;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          padding-right: 420px;
        }
        .plus-title {
          font-size: 2.8rem;
          font-weight: 700;
          color: #0B1736; /* var(--primary-dark-blue) */
          margin: 0;
        }
        .plus-logo {
          color: #1E3A8A; /* var(--primary-medium-blue) */
          font-weight: 900;
        }
        .plus-subtitle {
          font-size: 1.2rem;
          color: #5a647e; /* var(--text-secondary) */
          margin: 0.5rem 0 1.5rem 0;
        }
        .main-benefit-btn {
          display: inline-block;
          background-color: #FFFFFF; /* var(--background-light) */
          color: #0B1736; /* var(--primary-dark-blue) */
          font-weight: 600;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .plus-family-image {
          position: absolute;
          top: 20px;
          right: 30px;
          width: 400px;
          z-index: 2;
        }
        .plus-family-image img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .plus-benefits-card {
          background-color: #FFFFFF; /* var(--background-light) */
          border-radius: 12px;
          padding: 2rem 3rem 3rem 3rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* var(--box-shadow) */
          margin-top: -60px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
        }
        .benefits-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #5a647e; /* var(--text-secondary) */
          margin: 0 0 2rem 0;
          padding-top: 2.5rem;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #dee2e6; /* var(--border-color) */
        }
        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .benefit-icon {
          font-size: 1.8rem;
          color: #43A047; /* var(--accent-green) */
          margin-top: 5px;
        }
        .benefit-item strong {
          display: block;
          font-size: 1.1rem;
          color: #0B1736; /* var(--text-dark) */
          margin-bottom: 0.25rem;
        }
        .benefit-item p {
          color: #5a647e; /* var(--text-secondary) */
          line-height: 1.5;
          margin: 0;
        }
        .additional-benefits {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2rem;
          color: #5a647e; /* var(--text-secondary) */
        }
        .benefit-icon-small {
          color: #43A047; /* var(--accent-green) */
        }
        .explore-premium-wrapper {
          margin-top: 1.5rem;
          align-self: flex-end;
        }
        .explore-premium-btn {
          background-color: transparent;
          color: #1E3A8A; /* var(--primary-medium-blue) */
          border: 2px solid #1E3A8A; /* var(--primary-medium-blue) */
          border-radius: 8px; /* var(--border-radius) */
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        .explore-premium-btn:hover {
          background-color: #1E3A8A; /* var(--primary-medium-blue) */
          color: #FFFFFF; /* var(--text-light) */
          transform: scale(1.05);
        }
        @media (max-width: 992px) {
          .plus-family-image {
            display: none;
          }
          .plus-header {
            padding-right: 3rem;
          }
        }
      `}</style>
      <div className="plus-membership-section">
        <div className="plus-membership-container">
          <div className="plus-header">
            <h1 className="plus-title">
              HealthMeds <span className="plus-logo">Plus</span>
            </h1>
            <p className="plus-subtitle">Reduce your medical expenses with Plus</p>
            <div className="main-benefit-btn">
              Enjoy benefits worth ₹1500
            </div>
          </div>

          {/* <div className="plus-family-image">
            <img src="https://placehold.co/400x260/eaf5ff/FFFFFF?text=Family+Photo" alt="Happy Family enjoying Plus benefits" />
          </div> */}
          
          <div className="plus-benefits-card">
            <h3 className="benefits-title">Get exclusive access to</h3>
            <div className="benefits-grid">
              <div className="benefit-item">
                <FaPercentage className="benefit-icon" />
                <div>
                  <strong>5% Extra Discount</strong>
                  <p>Applicable on all medicines & healthcare products.</p>
                </div>
              </div>
              <div className="benefit-item">
                <FaFlask className="benefit-icon" />
                <div>
                  <strong>50% Off Lab Tests</strong>
                  <p>Applicable on your first diagnostic lab test booking.</p>
                </div>
              </div>
              <div className="benefit-item">
                <FaShippingFast className="benefit-icon" />
                <div>
                  <strong>FREE Delivery</strong>
                  <p>Enjoy free & fast delivery on all medicine orders.</p>
                </div>
              </div>
            </div>
            <div className="additional-benefits">
              <FaPlusCircle className="benefit-icon-small" />
              <span>Additional Benefits: <strong>Zero Convenience Fees</strong> on all orders.</span>
            </div>

            <div className="explore-premium-wrapper">
              <button className="explore-premium-btn">Explore Premium →</button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PlusMembership;

