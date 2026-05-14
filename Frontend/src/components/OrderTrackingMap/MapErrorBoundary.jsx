import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Map Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="map-container">
                    <div className="map-header">
                        <h3>Live Tracking</h3>
                    </div>
                    <div className="map-error">
                        <p>⚠️ Unable to load map</p>
                        <p>The tracking map encountered an error. Please refresh the page.</p>
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
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
