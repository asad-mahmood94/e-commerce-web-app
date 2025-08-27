// // src/pages/OrderHistory.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       alert("Please login first to view your orders");
//       navigate("/login");
//       return;
//     }
//     fetchOrders();
//   }, [navigate, token]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) {
//         setOrders(res.data.orders);
//       } else {
//         setError("Failed to fetch orders");
//       }
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError(err.response?.data?.message || "Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending": return "#ff9800";
//       case "Processing": return "#2196f3";
//       case "Shipped": return "#4caf50";
//       case "Delivered": return "#2e7d32";
//       case "Cancelled": return "#f44336";
//       default: return "#757575";
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   if (loading) {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <Header />
//         <div style={{ marginTop: "20px" }}>
//           <div style={{
//             width: "50px",
//             height: "50px",
//             border: "5px solid #f3f3f3",
//             borderTop: "5px solid #3498db",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite",
//             margin: "0 auto"
//           }}></div>
//           <p>Loading your orders...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <Header />
//         <div style={{
//           backgroundColor: "#ffebee",
//           color: "#c62828",
//           padding: "20px",
//           borderRadius: "8px",
//           marginTop: "20px",
//           maxWidth: "500px",
//           margin: "20px auto"
//         }}>
//           <h3>Error Loading Orders</h3>
//           <p>{error}</p>
//           <button 
//             onClick={fetchOrders}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#c62828",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               marginTop: "10px"
//             }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//       <Header />

//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
//         <h1 style={{ 
//           textAlign: "center", 
//           margin: "20px 0 30px",
//           color: "#2c3e50"
//         }}>
//           Your Order History
//         </h1>

//         {orders.length === 0 ? (
//           <div style={{ 
//             textAlign: "center", 
//             padding: "40px",
//             backgroundColor: "white",
//             borderRadius: "8px",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
//           }}>
//             <h3 style={{ color: "#7f8c8d", marginBottom: "15px" }}>No orders yet</h3>
//             <p style={{ color: "#95a5a6", marginBottom: "20px" }}>
//               You haven't placed any orders yet. Start shopping to see your orders here!
//             </p>
//             <button
//               onClick={() => navigate("/")}
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: "#3498db",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "16px"
//               }}
//             >
//               Start Shopping
//             </button>
//           </div>
//         ) : (
//           <div>
//             {orders.map((order) => (
//               <div 
//                 key={order._id}
//                 style={{
//                   backgroundColor: "white",
//                   borderRadius: "8px",
//                   boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//                   marginBottom: "20px",
//                   overflow: "hidden"
//                 }}
//               >
//                 <div style={{
//                   padding: "15px 20px",
//                   backgroundColor: "#f8f9fa",
//                   borderBottom: "1px solid #e9ecef",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   flexWrap: "wrap"
//                 }}>
//                   <div>
//                     <strong>Order ID:</strong> {order._id.substring(0, 8)}...
//                   </div>
//                   <div>
//                     <strong>Date:</strong> {formatDate(order.createdAt)}
//                   </div>
//                   <div style={{
//                     padding: "5px 12px",
//                     borderRadius: "20px",
//                     backgroundColor: getStatusColor(order.status),
//                     color: "white",
//                     fontSize: "14px",
//                     fontWeight: "bold"
//                   }}>
//                     {order.status}
//                   </div>
//                 </div>

//                 <div style={{ padding: "20px" }}>
//                   <h3 style={{ margin: "0 0 15px", color: "#2c3e50" }}>Order Items</h3>

//                   {order.items.map((item) => (
//                     <div 
//                       key={item.productId._id} 
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         padding: "10px 0",
//                         borderBottom: "1px solid #f1f1f1"
//                       }}
//                     >
//                       <img
//                         src={`http://localhost:5000${item.productId.productImage}`}
//                         alt={item.productId.name}
//                         style={{
//                           width: "60px",
//                           height: "60px",
//                           objectFit: "cover",
//                           borderRadius: "4px",
//                           marginRight: "15px"
//                         }}
//                       />
//                       <div style={{ flex: 1 }}>
//                         <h4 style={{ margin: "0 0 5px", color: "#2c3e50" }}>
//                           {item.productId.name}
//                         </h4>
//                         <p style={{ margin: "0", color: "#7f8c8d", fontSize: "14px" }}>
//                           Quantity: {item.quantity} × ${item.price.toFixed(2)}
//                         </p>
//                       </div>
//                       <div style={{ fontWeight: "bold", color: "#2c3e50" }}>
//                         ${(item.quantity * item.price).toFixed(2)}
//                       </div>
//                     </div>
//                   ))}

//                   <div style={{ 
//                     display: "flex", 
//                     justifyContent: "space-between", 
//                     alignItems: "center",
//                     marginTop: "15px",
//                     paddingTop: "15px",
//                     borderTop: "2px solid #e9ecef"
//                   }}>
//                     <div>
//                       <h4 style={{ margin: "0", color: "#2c3e50" }}>Shipping Address</h4>
//                       <p style={{ margin: "5px 0 0", color: "#7f8c8d" }}>
//                         {order.fullName}<br />
//                         {order.address}<br />
//                         Phone: {order.phone}
//                       </p>
//                     </div>
//                     <div style={{ textAlign: "right" }}>
//                       <h3 style={{ margin: "0", color: "#2c3e50" }}>
//                         Total: ${order.totalAmount.toFixed(2)}
//                       </h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

















// src/pages/OrderHistory.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [showCancelOptions, setShowCancelOptions] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login first to view your orders");
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [navigate, token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/orders", {
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

  const canCancelOrder = (orderDate) => {
    const orderTime = new Date(orderDate).getTime();
    const currentTime = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    return (currentTime - orderTime) < twentyFourHours;
  };

  const handleCancelOrder = async (orderId, cancelType) => {
    if (!window.confirm(`Are you sure you want to cancel this order?`)) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        { cancelType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Order cancelled successfully!");
        // Refresh the orders list
        fetchOrders();
      } else {
        alert(res.data.message || "Failed to cancel order");
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancellingOrderId(null);
      setShowCancelOptions(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "#FFA726";
      case "Processing": return "#42A5F5";
      case "Shipped": return "#66BB6A";
      case "Delivered": return "#2E7D32";
      case "Cancelled by customer": return "#78909C";
      case "Cancelled by seller": return "#EF5350";
      case "Cancelled": return "#f44336";
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

  const getTimeRemaining = (orderDate) => {
    const orderTime = new Date(orderDate).getTime();
    const currentTime = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const timeRemaining = twentyFourHours - (currentTime - orderTime);

    if (timeRemaining <= 0) return "0 hours";

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Header />
        <div style={{ marginTop: "20px" }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "5px solid #f3f3f3",
            borderTop: "5px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto"
          }}></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Header />
        <div style={{
          backgroundColor: "#ffebee",
          color: "#c62828",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
          maxWidth: "500px",
          margin: "20px auto"
        }}>
          <h3>Error Loading Orders</h3>
          <p>{error}</p>
          <button
            onClick={fetchOrders}
            style={{
              padding: "10px 20px",
              backgroundColor: "#c62828",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Header />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <h1 style={{
          textAlign: "center",
          margin: "20px 0 30px",
          color: "#2c3e50"
        }}>
          Your Order History
        </h1>

        {orders.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ color: "#7f8c8d", marginBottom: "15px" }}>No orders yet</h3>
            <p style={{ color: "#95a5a6", marginBottom: "20px" }}>
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div>
            {orders.map((order) => {
              const canCancel = order.status === "Pending" && canCancelOrder(order.createdAt);
              const timeRemaining = canCancel ? getTimeRemaining(order.createdAt) : null;

              return (
                <div
                  key={order._id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    marginBottom: "20px",
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  <div style={{
                    padding: "15px 20px",
                    backgroundColor: "#f8f9fa",
                    borderBottom: "1px solid #e9ecef",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap"
                  }}>
                    <div>
                      <strong>Order ID:</strong> {order._id.substring(0, 8)}...
                    </div>
                    <div>
                      <strong>Date:</strong> {formatDate(order.createdAt)}
                    </div>
                    <div style={{
                      padding: "5px 12px",
                      borderRadius: "20px",
                      backgroundColor: getStatusColor(order.status),
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "bold"
                    }}>
                      {order.status}
                    </div>
                  </div>

                  <div style={{ padding: "20px" }}>
                    <h3 style={{ margin: "0 0 15px", color: "#2c3e50" }}>Order Items</h3>

                    {order.items.map((item) => (
                      <div
                        key={item.productId._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "10px 0",
                          borderBottom: "1px solid #f1f1f1"
                        }}
                      >
                        <img
                          src={`http://localhost:5000${item.productId.productImage}`}
                          alt={item.productId.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            marginRight: "15px"
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: "0 0 5px", color: "#2c3e50" }}>
                            {item.productId.name}
                          </h4>
                          <p style={{ margin: "0", color: "#7f8c8d", fontSize: "14px" }}>
                            Quantity: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div style={{ fontWeight: "bold", color: "#2c3e50" }}>
                          ${(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "15px",
                      paddingTop: "15px",
                      borderTop: "2px solid #e9ecef"
                    }}>
                      <div>
                        <h4 style={{ margin: "0", color: "#2c3e50" }}>Shipping Address</h4>
                        <p style={{ margin: "5px 0 0", color: "#7f8c8d" }}>
                          {order.fullName}<br />
                          {order.address}<br />
                          Phone: {order.phone}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <h3 style={{ margin: "0", color: "#2c3e50" }}>
                          Total: ${order.totalAmount.toFixed(2)}
                        </h3>
                      </div>
                    </div>

                    {canCancel && (
                      <div style={{
                        marginTop: "20px",
                        padding: "15px",
                        backgroundColor: "#fff3e0",
                        borderRadius: "6px",
                        border: "1px solid #ffb74d",
                      }}>
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: showCancelOptions === order._id ? "15px" : "0"
                        }}>
                          <div>
                            <p style={{ margin: "0", fontWeight: "bold", color: "#e65100" }}>
                              You can cancel this order within 24 hours of placement
                            </p>
                            <p style={{ margin: "5px 0 0", fontSize: "14px", color: "#ef6c00" }}>
                              Time remaining: {timeRemaining}
                            </p>
                          </div>
                          {showCancelOptions !== order._id ? (
                            <button
                              onClick={() => setShowCancelOptions(order._id)}
                              style={{
                                padding: "10px 20px",
                                backgroundColor: "#ff9800",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "bold"
                              }}
                            >
                              Cancel Order
                            </button>
                          ) : (
                            <button
                              onClick={() => setShowCancelOptions(null)}
                              style={{
                                padding: "10px 20px",
                                backgroundColor: "#9e9e9e",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "bold"
                              }}
                            >
                              Close Options
                            </button>
                          )}
                        </div>

                        {showCancelOptions === order._id && (
                          <div style={{
                            padding: "15px",
                            backgroundColor: "#fff8e1",
                            borderRadius: "4px",
                            border: "1px dashed #ffa000"
                          }}>
                            <p style={{ margin: "0 0 10px", fontWeight: "bold", color: "#e65100" }}>
                              Why are you cancelling this order?
                            </p>
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                              <button
                                onClick={() => handleCancelOrder(order._id, "Cancelled by me")}
                                disabled={cancellingOrderId === order._id}
                                style={{
                                  padding: "10px 15px",
                                  backgroundColor: cancellingOrderId === order._id ? "#ccc" : "#ff5722",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: cancellingOrderId === order._id ? "not-allowed" : "pointer",
                                  fontWeight: "bold"
                                }}
                              >
                                {cancellingOrderId === order._id ? "Cancelling..." : "I Changed My Mind"}
                              </button>
                              <button
                                onClick={() => handleCancelOrder(order._id, "Cancelled by seller")}
                                disabled={cancellingOrderId === order._id}
                                style={{
                                  padding: "10px 15px",
                                  backgroundColor: cancellingOrderId === order._id ? "#ccc" : "#d32f2f",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: cancellingOrderId === order._id ? "not-allowed" : "pointer",
                                  fontWeight: "bold"
                                }}
                              >
                                {cancellingOrderId === order._id ? "Cancelling..." : "Seller Issue"}
                              </button>
                            </div>
                            <p style={{ margin: "10px 0 0", fontSize: "12px", color: "#e65100" }}>
                              Select "I Changed My Mind" if you no longer want the product.<br />
                              Select "Seller Issue" if there's a problem with the seller.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}