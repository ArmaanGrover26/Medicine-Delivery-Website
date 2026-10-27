import React, { useState } from 'react';
import { BsArrowLeft, BsShieldLockFill } from 'react-icons/bs';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaUser, FaLock, FaMotorcycle, FaBoxes, FaShieldAlt, FaCheckCircle, FaBolt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLoginPage.css';

const AdminLoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate smooth auth check
    setTimeout(() => {
      if (username === 'admin' && password === 'password123') {
        onLogin();
        navigate('/admin');
      } else {
        setError('Invalid username or password. Verify credentials and retry.');
        setLoading(false);
      }
    }, 400);
  };

  const fillDemoCredentials = () => {
    setUsername('admin');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="admin-login-wrapper">
      <Link to="/" className="admin-back-link">
        <BsArrowLeft /> Back to HealthMeds Store
      </Link>

      <div className="admin-login-card">
        {/* Left Column: Command Center Branding & Overview */}
        <div className="admin-brand-column">
          <div className="admin-system-status">
            <span className="status-indicator-dot"></span>
            <span>Console Operational • v2.4</span>
          </div>

          <div className="admin-brand-header">
            <div className="admin-brand-badge">
              <BsShieldLockFill />
            </div>
            <h2>HealthMeds <strong>Command Center</strong></h2>
            <p>
              Executive management console for store operations, pharmacy inventory, and real-time fleet dispatch.
            </p>
          </div>

          <div className="admin-features-grid">
            <div className="admin-feature-row">
              <div className="feature-icon-box blue">
                <FaMotorcycle />
              </div>
              <div>
                <strong>Fleet Dispatch & Tracking</strong>
                <p>Assign orders to active delivery partners & monitor runs</p>
              </div>
            </div>

            <div className="admin-feature-row">
              <div className="feature-icon-box emerald">
                <FaBoxes />
              </div>
              <div>
                <strong>Pharmacy Inventory Control</strong>
                <p>Manage stock availability, medicine catalog & pricing</p>
              </div>
            </div>

            <div className="admin-feature-row">
              <div className="feature-icon-box purple">
                <FaShieldAlt />
              </div>
              <div>
                <strong>Security & Governance</strong>
                <p>Customer accounts, rider verification & audit logging</p>
              </div>
            </div>
          </div>

          <div className="admin-security-footer">
            <BsShieldLockFill className="footer-shield" />
            <span>256-bit Encrypted Session • Restricted Admin Access</span>
          </div>
        </div>

        {/* Right Column: Interactive Login Form */}
        <div className="admin-form-column">
          <div className="admin-form-header">
            <div className="admin-form-icon">
              <FaLock />
            </div>
            <h3>Administrator Sign In</h3>
            <p className="form-subtext">Enter your credentials to access operations</p>
          </div>

          {/* Quick Demo Fill Helper */}
          <button
            type="button"
            className="demo-credentials-pill"
            onClick={fillDemoCredentials}
            title="Auto-fill default admin credentials"
          >
            <FaBolt className="bolt-icon" /> Auto-fill Demo Credentials (admin / password123)
          </button>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-field-group">
              <label htmlFor="username">Admin Username</label>
              <div className="input-field-inner">
                <FaUser className="field-icon-left" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="form-field-group">
              <label htmlFor="password">Security Password</label>
              <div className="input-field-inner">
                <FaLock className="field-icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-spinner-wrap">
                  <span className="spinner-dot"></span>
                  Authenticating...
                </span>
              ) : (
                <>Sign In to Dashboard</>
              )}
            </button>
          </form>

          <div className="admin-login-footer-hint">
            <span>HealthMeds Internal Enterprise Systems</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
