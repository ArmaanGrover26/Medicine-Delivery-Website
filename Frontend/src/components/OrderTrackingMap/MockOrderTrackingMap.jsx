import React, { useState, useEffect } from 'react';
import './OrderTrackingMap.css';
import './MockMap.css';
import { FaMapMarkerAlt, FaTruck, FaRoute } from 'react-icons/fa';

const MockOrderTrackingMap = ({ order }) => {
    const [progress, setProgress] = useState(0);
    const [distance, setDistance] = useState(3.2);
    const [eta, setEta] = useState(25);

    // Simulate delivery progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev >= 100 ? 0 : prev + 2;
                // Update distance and ETA based on progress
                setDistance((3.2 * (100 - newProgress) / 100).toFixed(1));
                setEta(Math.max(5, Math.round(25 * (100 - newProgress) / 100)));
                return newProgress;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="map-container">
            <div className="map-header">
                <h3>Live Tracking</h3>
                <div className="map-stats">
                    <span className="stat">
                        <strong>Distance:</strong> {distance} km
                    </span>
                    <span className="stat">
                        <strong>ETA:</strong> {eta} mins
                    </span>
                </div>
            </div>

            <div className="mock-map">
                {/* Map Background */}
                <div className="map-background">
                    {/* Grid pattern to simulate map */}
                    <div className="map-grid"></div>

                    {/* Route Line */}
                    <svg className="route-line" viewBox="0 0 400 400">
                        <defs>
                            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: '#4285F4', stopOpacity: 0.8 }} />
                                <stop offset={`${progress}%`} style={{ stopColor: '#34A853', stopOpacity: 0.8 }} />
                                <stop offset={`${progress}%`} style={{ stopColor: '#4285F4', stopOpacity: 0.4 }} />
                                <stop offset="100%" style={{ stopColor: '#4285F4', stopOpacity: 0.4 }} />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 50 350 Q 200 50 350 50"
                            fill="none"
                            stroke="url(#routeGradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Delivery Person Marker (moves along route) */}
                    <div
                        className="delivery-marker"
                        style={{
                            left: `${50 + (progress * 3)}px`,
                            top: `${350 - (progress * 3)}px`,
                        }}
                    >
                        <div className="marker-icon delivery-icon">
                            <FaTruck />
                        </div>
                        <div className="marker-pulse"></div>
                    </div>

                    {/* Destination Marker */}
                    <div className="destination-marker" style={{ left: '350px', top: '50px' }}>
                        <div className="marker-icon destination-icon">
                            <FaMapMarkerAlt />
                        </div>
                        <div className="marker-label">Your Address</div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="delivery-info-card">
                        <div className="info-row">
                            <FaTruck className="info-icon" />
                            <div>
                                <strong>{order?.delivery_person_name || 'Rajesh Kumar'}</strong>
                                <p>{order?.delivery_person_phone || '+91 98765 43210'}</p>
                            </div>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="progress-text">{progress}% of delivery completed</p>
                    </div>
                </div>
            </div>

            <div className="map-legend">
                <div className="legend-item">
                    <span className="legend-marker red"></span>
                    <span>Your Delivery Address</span>
                </div>
                <div className="legend-item">
                    <span className="legend-marker blue"></span>
                    <span>Delivery Person (Live Location)</span>
                </div>
            </div>

            <div className="map-note">
                <small>📍 Simulated tracking view - Updates every few seconds</small>
            </div>
        </div>
    );
};

export default MockOrderTrackingMap;
