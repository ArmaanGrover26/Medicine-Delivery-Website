import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaMotorcycle, FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import './DeliveryLoginPage.css';

const DeliveryLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { deliveryLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await deliveryLogin({ email, password });
    } catch (err) {
      setError(err.message || 'Invalid credentials or unauthorized.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delivery-login-wrapper">
      <Link to="/" className="back-to-home">
        <BsArrowLeft /> Back to Home
      </Link>

      <div className="delivery-login-card-light">
        <div className="delivery-login-header">
          <div className="delivery-login-icon-badge">
            <FaMotorcycle />
          </div>
          <h2>Delivery Partner Login</h2>
          <p>Access your fleet portal and manage deliveries</p>
        </div>

        {error && <div className="delivery-auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="delivery-login-form">
          <div className="delivery-field-group">
            <label htmlFor="email">Registered Email</label>
            <div className="delivery-input-inner">
              <FaEnvelope className="delivery-input-icon" />
              <input
                id="email"
                type="email"
                required
                placeholder="rider@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="delivery-field-group">
            <label htmlFor="password">Password</label>
            <div className="delivery-input-inner">
              <FaLock className="delivery-input-icon" />
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="delivery-submit-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : (
              <>
                <span>Sign In to Dashboard</span>
                <FaArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="delivery-login-footer">
          <p>
            Want to deliver with us?{' '}
            <Link to="/delivery/signup">Register as Partner</Link>
          </p>
          <div className="delivery-divider"><span>OR</span></div>
          <p>
            Customer ordering medicines?{' '}
            <Link to="/login">Customer Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryLoginPage;
