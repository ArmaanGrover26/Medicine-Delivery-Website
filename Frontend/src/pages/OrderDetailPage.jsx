import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './OrderDetailPage.css';
import { BsArrowLeft, BsCheckCircle, BsClock, BsTruck, BsBox } from 'react-icons/bs';
import MockOrderTrackingMap from '../components/OrderTrackingMap/MockOrderTrackingMap';

const OrderDetailPage = () => {
    const { orderId } = useParams();
    const { token } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
                    headers: {
                        'x-auth-token': token
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrder(data);
                } else {
                    console.error('Failed to fetch order details');
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchOrderDetails();
        }
    }, [orderId, token]);

    if (loading) {
        return <div className="order-detail-loading">Loading order details...</div>;
    }

    if (!order) {
        return (
            <div className="order-not-found">
                <h2>Order not found</h2>
                <Link to="/my-orders">Back to My Orders</Link>
            </div>
        );
    }

    // Order status timeline
    const statuses = ['Order Placed', 'Processing', 'Out for Delivery', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(order.status || 'Order Placed');

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Order Placed': return <BsBox />;
            case 'Processing': return <BsClock />;
            case 'Out for Delivery': return <BsTruck />;
            case 'Delivered': return <BsCheckCircle />;
            default: return <BsBox />;
        }
    };

    return (
        <div className="order-detail-page">
            <Link to="/profile" className="back-link">
                <BsArrowLeft /> Back to My Orders
            </Link>

            <div className="order-detail-container">
                {/* Order Header */}
                <div className="order-header">
                    <div>
                        <h1>Order #{order.id}</h1>
                        <p className="order-date">
                            Placed on {new Date(order.order_date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    <div className="order-total">
                        <span className="total-label">Total Amount</span>
                        <span className="total-amount">₹{Number(order.total_amount).toFixed(2)}</span>
                    </div>
                </div>

                {/* Live Tracking - Mock Map */}
                {order.status === 'Out for Delivery' && (
                    <MockOrderTrackingMap order={order} />
                )}

                {/* Tracking Timeline */}
                <div className="tracking-timeline">
                    <h2>Order Status</h2>
                    <div className="timeline">
                        {statuses.map((status, index) => (
                            <div
                                key={status}
                                className={`timeline-item ${index <= currentStatusIndex ? 'completed' : ''} ${index === currentStatusIndex ? 'current' : ''}`}
                            >
                                <div className="timeline-icon">
                                    {getStatusIcon(status)}
                                </div>
                                <div className="timeline-content">
                                    <h3>{status}</h3>
                                    {index === currentStatusIndex && (
                                        <p className="current-status-text">Current Status</p>
                                    )}
                                </div>
                                {index < statuses.length - 1 && <div className="timeline-line"></div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Items */}
                <div className="order-items-section">
                    <h2>Order Items ({order.items?.length || 0})</h2>
                    <div className="order-items-list">
                        {order.items?.map((item) => (
                            <div key={item.id} className="order-item">
                                <div className="item-info">
                                    <h3>{item.product_name}</h3>
                                    <p className="item-category">{item.product_category}</p>
                                </div>
                                <div className="item-details">
                                    <span className="item-quantity">Qty: {item.quantity}</span>
                                    <span className="item-price">₹{Number(item.price_at_purchase).toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Delivery Information */}
                <div className="delivery-info-section">
                    <h2>Delivery Information</h2>
                    <div className="info-card">
                        <div className="info-row">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{order.shipping_name}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Address:</span>
                            <span className="info-value">{order.shipping_address}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Phone:</span>
                            <span className="info-value">{order.shipping_phone}</span>
                        </div>
                        {order.estimated_delivery && (
                            <div className="info-row">
                                <span className="info-label">Estimated Delivery:</span>
                                <span className="info-value">
                                    {new Date(order.estimated_delivery).toLocaleString('en-IN')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
