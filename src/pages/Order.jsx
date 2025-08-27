// src/pages/Order.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
// import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/order.css"; // Import the CSS file

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        // Check if user is admin
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data.success) {
                    setUser(res.data.user);
                    if (res.data.user.isAdmin) {
                        fetchOrders();
                    } else {
                        setError("Access denied. Admin privileges required.");
                        setLoading(false);
                    }
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to verify user permissions");
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate, token]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/orders/all", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                setOrders(res.data.orders);
            } else {
                setError("Failed to fetch orders");
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError(err.response?.data?.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setUpdatingOrderId(orderId);
            const res = await axios.put(
                `http://localhost:5000/api/orders/${orderId}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                alert("Order status updated successfully!");
                // Refresh the orders list
                fetchOrders();
            } else {
                alert(res.data.message || "Failed to update order status");
            }
        } catch (err) {
            console.error("Error updating order status:", err);
            alert(err.response?.data?.message || "Failed to update order status");
        } finally {
            setUpdatingOrderId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "#ff9800";
            case "Processing": return "#2196f3";
            case "Shipped": return "#4caf50";
            case "Delivered": return "#2e7d32";
            case "Cancelled by customer": return "#f57c00";
            case "Cancelled by seller": return "#f44336";
            default: return "#757575";
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Check if order is cancelled by user
    const isCancelledByUser = (status) => {
        return status === "Cancelled by user";
    };

    if (loading) {
        return (
            <div className="order-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-container">
                <div className="error-container">
                    <h3>Error</h3>
                    <p>{error}</p>
                    {error === "Access denied. Admin privileges required." ? (
                        <button
                            onClick={() => navigate("/")}
                            className="home-button"
                        >
                            Go to Home
                        </button>
                    ) : (
                        <button
                            onClick={fetchOrders}
                            className="try-again-button"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="order-page">
            {/* <Header /> */}
            <div className="order-content">
                <h1 className="order-title">Orders Management (Admin)</h1>

                {orders.length === 0 ? (
                    <div className="no-orders">
                        <h3>No orders found</h3>
                        <p>There are no orders in the system yet.</p>
                    </div>
                ) : (
                    <div>
                        {orders.map((order) => {
                            const cancelledByUser = isCancelledByUser(order.status);

                            return (
                                <div
                                    key={order._id}
                                    className="order-card"
                                >
                                    <div className="order-header">
                                        <div>
                                            <strong>Order ID:</strong> {order._id.substring(0, 8)}...
                                        </div>
                                        <div>
                                            <strong>Customer:</strong> {order.userId?.email || "Unknown"}
                                        </div>
                                        <div>
                                            <strong>Date:</strong> {formatDate(order.createdAt)}
                                        </div>
                                        <div 
                                            className="status-badge"
                                            style={{ backgroundColor: getStatusColor(order.status) }}
                                        >
                                            {order.status}
                                        </div>
                                    </div>

                                    <div className="order-body">
                                        <h3>Order Items</h3>

                                        {order.items.map((item) => (
                                            <div
                                                key={item.productId._id}
                                                className="order-item"
                                            >
                                                <img
                                                    src={`http://localhost:5000${item.productId.productImage}`}
                                                    alt={item.productId.name}
                                                    className="product-image"
                                                />
                                                <div className="product-info">
                                                    <h4>{item.productId.name}</h4>
                                                    <p>Quantity: {item.quantity} × ${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="product-total">
                                                    ${(item.quantity * item.price).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="order-footer">
                                            <div>
                                                <h4>Shipping Address</h4>
                                                <p>
                                                    {order.fullName}<br />
                                                    {order.address}<br />
                                                    Phone: {order.phone}
                                                </p>
                                            </div>
                                            <div className="total-amount">
                                                <h3>Total: ${order.totalAmount.toFixed(2)}</h3>
                                            </div>
                                        </div>

                                        {/* Status Update Section - Only show if not cancelled by user */}
                                        {!cancelledByUser ? (
                                            <div className="status-update">
                                                <h4>Update Order Status</h4>
                                                <div className="status-controls">
                                                    <select
                                                        defaultValue=""
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        disabled={updatingOrderId === order._id}
                                                        className="status-select"
                                                    >
                                                        <option value="" disabled>Select new status</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled by seller">Cancel Order (by Seller)</option>
                                                    </select>
                                                    {updatingOrderId === order._id && (
                                                        <div className="update-spinner"></div>
                                                    )}
                                                </div>
                                                <p className="status-note">
                                                    Select "Cancel Order (by Seller)" to cancel this order on behalf of the seller.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="cancelled-notice">
                                                <h4>Order Cancelled by User</h4>
                                                <p>
                                                    This order was cancelled by the user and cannot be modified.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}