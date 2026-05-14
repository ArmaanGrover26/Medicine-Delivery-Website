import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import './OrderTrackingMap.css';

const OrderTrackingMap = ({ order }) => {
    const [deliveryLocation, setDeliveryLocation] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [map, setMap] = useState(null);

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // Debug logging
    console.log('Google Maps API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);

    // Use the hook to load Google Maps
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey || '',
        libraries: ['places'],
    });

    // Log loading status
    console.log('Maps isLoaded:', isLoaded);
    console.log('Maps loadError:', loadError);

    // Mock delivery person location for demo
    useEffect(() => {
        // Safety check for order object
        if (!order || !isLoaded) return;

        if (order.status === 'Out for Delivery') {
            const interval = setInterval(() => {
                setDeliveryLocation({
                    lat: 28.6139 + Math.random() * 0.01,
                    lng: 77.2090 + Math.random() * 0.01
                });
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [order, isLoaded]);

    const customerLocation = {
        lat: 28.6139,
        lng: 77.2090
    };

    const initialDeliveryLocation = deliveryLocation || {
        lat: 28.6239,
        lng: 77.2190
    };

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
        borderRadius: '12px'
    };

    const calculateDistance = () => {
        if (!deliveryLocation) return 'Calculating...';

        const R = 6371;
        const dLat = (customerLocation.lat - deliveryLocation.lat) * Math.PI / 180;
        const dLon = (customerLocation.lng - deliveryLocation.lng) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deliveryLocation.lat * Math.PI / 180) * Math.cos(customerLocation.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return `${distance.toFixed(2)} km`;
    };

    const calculateETA = () => {
        if (!deliveryLocation) return 'Calculating...';

        const distance = parseFloat(calculateDistance());
        const hours = distance / 30;
        const minutes = Math.round(hours * 60);

        return `${minutes} mins`;
    };

    const pathCoordinates = deliveryLocation
        ? [deliveryLocation, customerLocation]
        : [initialDeliveryLocation, customerLocation];

    const onLoad = (mapInstance) => {
        try {
            setMap(mapInstance);
            // Safety check before accessing Google Maps API
            if (window.google && window.google.maps && window.google.maps.LatLngBounds) {
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend(customerLocation);
                bounds.extend(initialDeliveryLocation);
                mapInstance.fitBounds(bounds);
            }
        } catch (error) {
            console.error('Error in map onLoad:', error);
        }
    };

    // Check if API key exists
    if (!apiKey) {
        return (
            <div className="map-container">
                <div className="map-header">
                    <h3>Live Tracking</h3>
                </div>
                <div className="map-error">
                    <p>⚠️ Google Maps API key not configured</p>
                    <p>Please add VITE_GOOGLE_MAPS_API_KEY to your .env file</p>
                </div>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="map-container">
                <div className="map-header">
                    <h3>Live Tracking</h3>
                </div>
                <div className="map-error">
                    <p>⚠️ Failed to load Google Maps</p>
                    <p>Error: {loadError.message || 'Please check your API key and internet connection'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            background: '#4285F4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="map-container">
                <div className="map-header">
                    <h3>Live Tracking</h3>
                </div>
                <div style={{ padding: '3rem', textAlign: 'center' }}>
                    <p>Loading map...</p>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #4285F4',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '1rem auto'
                    }}></div>
                </div>
            </div>
        );
    }

    // Safety check - don't render if window.google is not available
    if (!window.google || !window.google.maps) {
        return (
            <div className="map-container">
                <div className="map-header">
                    <h3>Live Tracking</h3>
                </div>
                <div className="map-error">
                    <p>⚠️ Google Maps API not ready</p>
                    <p>Please refresh the page</p>
                </div>
            </div>
        );
    }

    return (
        <div className="map-container">
            <div className="map-header">
                <h3>Live Tracking</h3>
                <div className="map-stats">
                    <span className="stat">
                        <strong>Distance:</strong> {calculateDistance()}
                    </span>
                    <span className="stat">
                        <strong>ETA:</strong> {calculateETA()}
                    </span>
                </div>
            </div>

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={customerLocation}
                zoom={13}
                onLoad={onLoad}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                }}
            >
                <Marker
                    position={customerLocation}
                    icon={{
                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}
                    title="Delivery Destination"
                />

                <Marker
                    position={deliveryLocation || initialDeliveryLocation}
                    icon={{
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}
                    title="Delivery Person"
                    onClick={() => setShowInfo(true)}
                />

                {showInfo && (
                    <InfoWindow
                        position={deliveryLocation || initialDeliveryLocation}
                        onCloseClick={() => setShowInfo(false)}
                    >
                        <div className="info-window">
                            <h4>Delivery Person</h4>
                            <p><strong>Name:</strong> {order?.delivery_person_name || 'Rajesh Kumar'}</p>
                            <p><strong>Phone:</strong> {order?.delivery_person_phone || '+91 98765 43210'}</p>
                            <p><strong>ETA:</strong> {calculateETA()}</p>
                        </div>
                    </InfoWindow>
                )}

                <Polyline
                    path={pathCoordinates}
                    options={{
                        strokeColor: '#4285F4',
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                    }}
                />
            </GoogleMap>

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
        </div>
    );
};

export default OrderTrackingMap;
