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

//                   {order.items.map((item) => {
//                     // Handle cases where productId might be null
//                     const product = item.productId || {};
//                     const productImage = product.productImage 
//                       ? `http://localhost:5000${product.productImage}`
//                       : "/placeholder-image.jpg"; // Fallback image
//                     const productName = product.name || "Product Not Available";

//                     return (
//                       <div 
//                         key={item._id || Math.random()} 
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           padding: "10px 0",
//                           borderBottom: "1px solid #f1f1f1"
//                         }}
//                       >
//                         <img
//                           src={productImage}
//                           alt={productName}
//                           style={{
//                             width: "60px",
//                             height: "60px",
//                             objectFit: "cover",
//                             borderRadius: "4px",
//                             marginRight: "15px"
//                           }}
//                           onError={(e) => {
//                             e.target.src = "/placeholder-image.jpg";
//                           }}
//                         />
//                         <div style={{ flex: 1 }}>
//                           <h4 style={{ margin: "0 0 5px", color: "#2c3e50" }}>
//                             {productName}
//                           </h4>
//                           <p style={{ margin: "0", color: "#7f8c8d", fontSize: "14px" }}>
//                             Quantity: {item.quantity} × ${item.price.toFixed(2)}
//                           </p>
//                         </div>
//                         <div style={{ fontWeight: "bold", color: "#2c3e50" }}>
//                           ${(item.quantity * item.price).toFixed(2)}
//                         </div>
//                       </div>
//                     );
//                   })}

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










// // src/pages/OrderHistory.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [chatOrder, setChatOrder] = useState(null); // track which order's chat is open
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

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

//   const openChat = (order) => {
//     setChatOrder(order);
//     setMessages([]); // reset messages when chat opens
//   };

//   const closeChat = () => {
//     setChatOrder(null);
//     setMessages([]);
//   };

//   const handleSendMessage = () => {
//     if (!newMessage.trim()) return;
//     const newMsg = { sender: "You", text: newMessage };
//     setMessages([...messages, newMsg]);
//     setNewMessage("");
//     // Later: send message to backend/seller via API or socket
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

//                   {order.items.map((item) => {
//                     const product = item.productId || {};
//                     const productImage = product.productImage 
//                       ? `http://localhost:5000${product.productImage}`
//                       : "/placeholder-image.jpg"; 
//                     const productName = product.name || "Product Not Available";

//                     return (
//                       <div 
//                         key={item._id || Math.random()} 
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           padding: "10px 0",
//                           borderBottom: "1px solid #f1f1f1"
//                         }}
//                       >
//                         <img
//                           src={productImage}
//                           alt={productName}
//                           style={{
//                             width: "60px",
//                             height: "60px",
//                             objectFit: "cover",
//                             borderRadius: "4px",
//                             marginRight: "15px"
//                           }}
//                           onError={(e) => {
//                             e.target.src = "/placeholder-image.jpg";
//                           }}
//                         />
//                         <div style={{ flex: 1 }}>
//                           <h4 style={{ margin: "0 0 5px", color: "#2c3e50" }}>
//                             {productName}
//                           </h4>
//                           <p style={{ margin: "0", color: "#7f8c8d", fontSize: "14px" }}>
//                             Quantity: {item.quantity} × ${item.price.toFixed(2)}
//                           </p>
//                         </div>
//                         <div style={{ fontWeight: "bold", color: "#2c3e50" }}>
//                           ${(item.quantity * item.price).toFixed(2)}
//                         </div>
//                       </div>
//                     );
//                   })}

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
//                       <button
//                         onClick={() => openChat(order)}
//                         style={{
//                           marginTop: "10px",
//                           padding: "8px 16px",
//                           backgroundColor: "#3498db",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer"
//                         }}
//                       >
//                         Message Seller
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Chat Window Modal */}
//       {chatOrder && (
//         <div style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           width: "350px",
//           backgroundColor: "white",
//           borderRadius: "8px",
//           boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
//           display: "flex",
//           flexDirection: "column",
//           zIndex: 1000
//         }}>
//           <div style={{
//             padding: "10px",
//             backgroundColor: "#3498db",
//             color: "white",
//             borderTopLeftRadius: "8px",
//             borderTopRightRadius: "8px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center"
//           }}>
//             <span>Chat with Seller (Order {chatOrder._id.substring(0, 6)})</span>
//             <button onClick={closeChat} style={{
//               background: "none",
//               border: "none",
//               color: "white",
//               fontSize: "18px",
//               cursor: "pointer"
//             }}>×</button>
//           </div>

//           <div style={{
//             flex: 1,
//             padding: "10px",
//             overflowY: "auto",
//             maxHeight: "250px"
//           }}>
//             {messages.length === 0 ? (
//               <p style={{ color: "#7f8c8d", textAlign: "center" }}>No messages yet</p>
//             ) : (
//               messages.map((msg, idx) => (
//                 <div key={idx} style={{
//                   marginBottom: "8px",
//                   textAlign: msg.sender === "You" ? "right" : "left"
//                 }}>
//                   <span style={{
//                     display: "inline-block",
//                     padding: "8px 12px",
//                     borderRadius: "15px",
//                     backgroundColor: msg.sender === "You" ? "#3498db" : "#ecf0f1",
//                     color: msg.sender === "You" ? "white" : "#2c3e50",
//                     maxWidth: "70%",
//                     wordWrap: "break-word"
//                   }}>
//                     {msg.text}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>

//           <div style={{
//             display: "flex",
//             borderTop: "1px solid #e0e0e0",
//             padding: "8px"
//           }}>
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type a message..."
//               style={{
//                 flex: 1,
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 padding: "8px"
//               }}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//             />
//             <button
//               onClick={handleSendMessage}
//               style={{
//                 marginLeft: "8px",
//                 backgroundColor: "#3498db",
//                 border: "none",
//                 borderRadius: "4px",
//                 color: "white",
//                 padding: "8px 12px",
//                 cursor: "pointer"
//               }}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}

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


// // src/pages/OrderHistory.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [chatOrder, setChatOrder] = useState(null); // track which order's chat is open
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

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

//   const openChat = (order) => {
//     setChatOrder(order);
//     setMessages([]); // reset messages when chat opens
//   };

//   const closeChat = () => {
//     setChatOrder(null);
//     setMessages([]);
//   };

//   const handleSendMessage = () => {
//     if (!newMessage.trim()) return;
//     const newMsg = { sender: "You", text: newMessage };
//     setMessages([...messages, newMsg]);
//     setNewMessage("");
//     // Later: send message to backend/seller via API or socket
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

//                   {order.items.map((item) => {
//                     const product = item.productId || {};
//                     const productImage = product.productImage 
//                       ? `http://localhost:5000${product.productImage}`
//                       : "/placeholder-image.jpg"; 
//                     const productName = product.name || "Product Not Available";

//                     return (
//                       <div 
//                         key={item._id || Math.random()} 
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           padding: "10px 0",
//                           borderBottom: "1px solid #f1f1f1"
//                         }}
//                       >
//                         <img
//                           src={productImage}
//                           alt={productName}
//                           style={{
//                             width: "60px",
//                             height: "60px",
//                             objectFit: "cover",
//                             borderRadius: "4px",
//                             marginRight: "15px"
//                           }}
//                           onError={(e) => {
//                             e.target.src = "/placeholder-image.jpg";
//                           }}
//                         />
//                         <div style={{ flex: 1 }}>
//                           <h4 style={{ margin: "0 0 5px", color: "#2c3e50" }}>
//                             {productName}
//                           </h4>
//                           <p style={{ margin: "0", color: "#7f8c8d", fontSize: "14px" }}>
//                             Quantity: {item.quantity} × ${item.price.toFixed(2)}
//                           </p>
//                         </div>
//                         <div style={{ fontWeight: "bold", color: "#2c3e50" }}>
//                           ${(item.quantity * item.price).toFixed(2)}
//                         </div>
//                       </div>
//                     );
//                   })}

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
//                       <button
//                         onClick={() => openChat(order)}
//                         style={{
//                           marginTop: "10px",
//                           padding: "8px 16px",
//                           backgroundColor: "#3498db",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer"
//                         }}
//                       >
//                         Message Seller
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Chat Window Modal */}
//       {chatOrder && (
//         <div style={{
//           position: "fixed",
//           bottom: "30px",
//           right: "30px",
//           width: "450px",
//           height: "500px",
//           backgroundColor: "white",
//           borderRadius: "10px",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//           display: "flex",
//           flexDirection: "column",
//           zIndex: 1000
//         }}>
//           <div style={{
//             padding: "12px 15px",
//             backgroundColor: "#3498db",
//             color: "white",
//             borderTopLeftRadius: "10px",
//             borderTopRightRadius: "10px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             fontSize: "16px",
//             fontWeight: "bold"
//           }}>
//             <span>Chat with Seller (Order {chatOrder._id.substring(0, 6)})</span>
//             <button onClick={closeChat} style={{
//               background: "none",
//               border: "none",
//               color: "white",
//               fontSize: "20px",
//               cursor: "pointer"
//             }}>×</button>
//           </div>

//           <div style={{
//             flex: 1,
//             padding: "12px",
//             overflowY: "auto",
//             maxHeight: "400px"
//           }}>
//             {messages.length === 0 ? (
//               <p style={{ color: "#7f8c8d", textAlign: "center" }}>No messages yet</p>
//             ) : (
//               messages.map((msg, idx) => (
//                 <div key={idx} style={{
//                   marginBottom: "10px",
//                   textAlign: msg.sender === "You" ? "right" : "left"
//                 }}>
//                   <span style={{
//                     display: "inline-block",
//                     padding: "10px 14px",
//                     borderRadius: "18px",
//                     backgroundColor: msg.sender === "You" ? "#3498db" : "#ecf0f1",
//                     color: msg.sender === "You" ? "white" : "#2c3e50",
//                     maxWidth: "75%",
//                     wordWrap: "break-word"
//                   }}>
//                     {msg.text}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>

//           <div style={{
//             display: "flex",
//             borderTop: "1px solid #e0e0e0",
//             padding: "10px"
//           }}>
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type a message..."
//               style={{
//                 flex: 1,
//                 border: "1px solid #ccc",
//                 borderRadius: "5px",
//                 padding: "10px"
//               }}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//             />
//             <button
//               onClick={handleSendMessage}
//               style={{
//                 marginLeft: "10px",
//                 backgroundColor: "#3498db",
//                 border: "none",
//                 borderRadius: "5px",
//                 color: "white",
//                 padding: "10px 14px",
//                 cursor: "pointer"
//               }}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}

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











// // src/pages/OrderHistory.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { Rnd } from "react-rnd";

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [chatOrder, setChatOrder] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

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

//   const openChat = (order) => {
//     setChatOrder(order);
//     setMessages([]);
//   };

//   const closeChat = () => {
//     setChatOrder(null);
//     setMessages([]);
//   };

//   const handleSendMessage = () => {
//     if (!newMessage.trim()) return;
//     const newMsg = { sender: "You", text: newMessage };
//     setMessages([...messages, newMsg]);
//     setNewMessage("");
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

//                   {order.items.map((item) => {
//                     const product = item.productId || {};
//                     const productImage = product.productImage 
//                       ? `http://localhost:5000${product.productImage}`
//                       : "/placeholder-image.jpg"; 
//                     const productName = product.name || "Product Not Available";

//                     return (
//                       <div 
//                         key={item._id || Math.random()} 
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           padding: "10px 0",
//                           borderBottom: "1px solid #f1f1f1"
//                         }}
//                       >
//                         <img
//                           src={productImage}
//                           alt={productName}
//                           style={{
//                             width: "60px",
//                             height: "60px",
//                             objectFit: "cover",
//                             borderRadius: "4px",
//                             marginRight: "15px"
//                           }}
//                           onError={(e) => {
//                             e.target.src = "/placeholder-image.jpg";
//                           }}
//                         />
//                         <div style={{ flex: 1 }}>
//                           <h4 style={{ margin: "0 0 5px", color: "#2c3e50" }}>
//                             {productName}
//                           </h4>
//                           <p style={{ margin: "0", color: "#7f8c8d", fontSize: "14px" }}>
//                             Quantity: {item.quantity} × ${item.price.toFixed(2)}
//                           </p>
//                         </div>
//                         <div style={{ fontWeight: "bold", color: "#2c3e50" }}>
//                           ${(item.quantity * item.price).toFixed(2)}
//                         </div>
//                       </div>
//                     );
//                   })}

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
//                       <button
//                         onClick={() => openChat(order)}
//                         style={{
//                           marginTop: "10px",
//                           padding: "8px 16px",
//                           backgroundColor: "#3498db",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer"
//                         }}
//                       >
//                         Message Seller
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Chat Window (Draggable + Resizable) */}
//       {chatOrder && (
//         <Rnd
//           default={{
//             x: window.innerWidth - 500,
//             y: window.innerHeight - 600,
//             width: 450,
//             height: 500,
//           }}
//           minWidth={350}
//           minHeight={400}
//           bounds="window"
//           style={{
//             zIndex: 1000,
//             background: "white",
//             borderRadius: "10px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div style={{
//             padding: "12px 15px",
//             backgroundColor: "#3498db",
//             color: "white",
//             borderTopLeftRadius: "10px",
//             borderTopRightRadius: "10px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "move"
//           }}>
//             <span>Chat with Seller (Order {chatOrder._id.substring(0, 6)})</span>
//             <button onClick={closeChat} style={{
//               background: "none",
//               border: "none",
//               color: "white",
//               fontSize: "20px",
//               cursor: "pointer"
//             }}>×</button>
//           </div>

//           <div style={{
//             flex: 1,
//             padding: "12px",
//             overflowY: "auto"
//           }}>
//             {messages.length === 0 ? (
//               <p style={{ color: "#7f8c8d", textAlign: "center" }}>No messages yet</p>
//             ) : (
//               messages.map((msg, idx) => (
//                 <div key={idx} style={{
//                   marginBottom: "10px",
//                   textAlign: msg.sender === "You" ? "right" : "left"
//                 }}>
//                   <span style={{
//                     display: "inline-block",
//                     padding: "10px 14px",
//                     borderRadius: "18px",
//                     backgroundColor: msg.sender === "You" ? "#3498db" : "#ecf0f1",
//                     color: msg.sender === "You" ? "white" : "#2c3e50",
//                     maxWidth: "75%",
//                     wordWrap: "break-word"
//                   }}>
//                     {msg.text}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>

//           <div style={{
//             display: "flex",
//             borderTop: "1px solid #e0e0e0",
//             padding: "10px"
//           }}>
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type a message..."
//               style={{
//                 flex: 1,
//                 border: "1px solid #ccc",
//                 borderRadius: "5px",
//                 padding: "10px"
//               }}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//             />
//             <button
//               onClick={handleSendMessage}
//               style={{
//                 marginLeft: "10px",
//                 backgroundColor: "#3498db",
//                 border: "none",
//                 borderRadius: "5px",
//                 color: "white",
//                 padding: "10px 14px",
//                 cursor: "pointer"
//               }}
//             >
//               Send
//             </button>
//           </div>
//         </Rnd>
//       )}

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















// // src/pages/OrderHistory.jsx
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { Rnd } from "react-rnd";
// import { io } from "socket.io-client";

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [chatOrder, setChatOrder] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const socketRef = useRef(null);
//   const navigate = useNavigate();
//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       alert("Please login first to view your orders");
//       navigate("/login");
//       return;
//     }
//     fetchOrders();
//     initSocket();
//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//     };
//   }, [navigate, token]);

//   const initSocket = () => {
//     socketRef.current = io("http://localhost:5000");
//     // Emit online status for the current user
//     const userData = JSON.parse(sessionStorage.getItem("user"));
//     if (userData?.id) socketRef.current.emit("online", userData.id);

//     socketRef.current.on("receiveMessage", (msg) => {
//       if (chatOrder && msg.senderId === chatOrder.sellerId) {
//         setMessages((prev) => [...prev, { sender: "Seller", text: msg.text }]);
//       }
//     });
//   };

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) setOrders(res.data.orders);
//       else setError("Failed to fetch orders");
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

//   const openChat = async (order) => {
//     setChatOrder(order);
//     setMessages([]);

//     try {
//       const res = await axios.get(`http://localhost:5000/api/messages/${order.sellerId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) {
//         const msgs = res.data.messages.map((m) => ({
//           sender: m.senderId === order.sellerId ? "Seller" : "You",
//           text: m.text,
//         }));
//         setMessages(msgs);
//       }
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   const closeChat = () => {
//     setChatOrder(null);
//     setMessages([]);
//   };

//   const handleSendMessage = () => {
//     if (!newMessage.trim() || !chatOrder) return;

//     const userData = JSON.parse(sessionStorage.getItem("user"));
//     const msgObj = {
//       senderId: userData.id,
//       receiverId: chatOrder.sellerId,
//       text: newMessage,
//     };

//     socketRef.current.emit("sendMessage", msgObj);
//     setMessages([...messages, { sender: "You", text: newMessage }]);
//     setNewMessage("");
//   };

//   // Auto-scroll chat to bottom
//   const chatEndRef = useRef(null);
//   useEffect(() => {
//     if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (loading) return <Loading />;
//   if (error) return <Error message={error} retry={fetchOrders} />;

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//       <Header />
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
//         <h1 style={{ textAlign: "center", margin: "20px 0 30px", color: "#2c3e50" }}>
//           Your Order History
//         </h1>
//         {orders.length === 0 ? <NoOrders navigate={navigate} /> : <OrderList orders={orders} openChat={openChat} getStatusColor={getStatusColor} formatDate={formatDate} />}
//       </div>

//       {/* Chat Window */}
//       {chatOrder && (
//         <Rnd
//           default={{ x: window.innerWidth - 500, y: window.innerHeight - 600, width: 450, height: 500 }}
//           minWidth={350}
//           minHeight={400}
//           bounds="window"
//           style={{
//             zIndex: 1000,
//             background: "white",
//             borderRadius: "10px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div style={{
//             padding: "12px 15px",
//             backgroundColor: "#3498db",
//             color: "white",
//             borderTopLeftRadius: "10px",
//             borderTopRightRadius: "10px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "move"
//           }}>
//             <span>Chat with Seller (Order {chatOrder._id.substring(0, 6)})</span>
//             <button onClick={closeChat} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>×</button>
//           </div>

//           <div style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
//             {messages.length === 0 ? (
//               <p style={{ color: "#7f8c8d", textAlign: "center" }}>No messages yet</p>
//             ) : (
//               messages.map((msg, idx) => (
//                 <div key={idx} style={{ marginBottom: "10px", textAlign: msg.sender === "You" ? "right" : "left" }}>
//                   <span style={{
//                     display: "inline-block",
//                     padding: "10px 14px",
//                     borderRadius: "18px",
//                     backgroundColor: msg.sender === "You" ? "#3498db" : "#ecf0f1",
//                     color: msg.sender === "You" ? "white" : "#2c3e50",
//                     maxWidth: "75%",
//                     wordWrap: "break-word"
//                   }}>
//                     {msg.text}
//                   </span>
//                 </div>
//               ))
//             )}
//             <div ref={chatEndRef}></div>
//           </div>

//           <div style={{ display: "flex", borderTop: "1px solid #e0e0e0", padding: "10px" }}>
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type a message..."
//               style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//             />
//             <button
//               onClick={handleSendMessage}
//               style={{ marginLeft: "10px", backgroundColor: "#3498db", border: "none", borderRadius: "5px", color: "white", padding: "10px 14px", cursor: "pointer" }}
//             >
//               Send
//             </button>
//           </div>
//         </Rnd>
//       )}
//     </div>
//   );
// }

// // ---------- Subcomponents ----------
// const Loading = () => (
//   <div style={{ padding: "20px", textAlign: "center" }}>
//     <Header />
//     <div style={{ marginTop: "20px" }}>
//       <div style={{
//         width: "50px",
//         height: "50px",
//         border: "5px solid #f3f3f3",
//         borderTop: "5px solid #3498db",
//         borderRadius: "50%",
//         animation: "spin 1s linear infinite",
//         margin: "0 auto"
//       }}></div>
//       <p>Loading your orders...</p>
//     </div>
//   </div>
// );

// const Error = ({ message, retry }) => (
//   <div style={{ padding: "20px", textAlign: "center" }}>
//     <Header />
//     <div style={{
//       backgroundColor: "#ffebee",
//       color: "#c62828",
//       padding: "20px",
//       borderRadius: "8px",
//       marginTop: "20px",
//       maxWidth: "500px",
//       margin: "20px auto"
//     }}>
//       <h3>Error Loading Orders</h3>
//       <p>{message}</p>
//       <button 
//         onClick={retry}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#c62828",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//           marginTop: "10px"
//         }}
//       >
//         Try Again
//       </button>
//     </div>
//   </div>
// );

// const NoOrders = ({ navigate }) => (
//   <div style={{ textAlign: "center", padding: "40px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
//     <h3 style={{ color: "#7f8c8d", marginBottom: "15px" }}>No orders yet</h3>
//     <p style={{ color: "#95a5a6", marginBottom: "20px" }}>
//       You haven't placed any orders yet. Start shopping to see your orders here!
//     </p>
//     <button
//       onClick={() => navigate("/")}
//       style={{
//         padding: "10px 20px",
//         backgroundColor: "#3498db",
//         color: "white",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//         fontSize: "16px"
//       }}
//     >
//       Start Shopping
//     </button>
//   </div>
// );

// const OrderList = ({ orders, openChat, getStatusColor, formatDate }) => (
//   <div>
//     {orders.map((order) => (
//       <div key={order._id} style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginBottom: "20px", overflow: "hidden" }}>
//         <div style={{ padding: "15px 20px", backgroundColor: "#f8f9fa", borderBottom: "1px solid #e9ecef", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
//           <div><strong>Order ID:</strong> {order._id.substring(0, 8)}...</div>
//           <div><strong>Date:</strong> {formatDate(order.createdAt)}</div>
//           <div style={{ padding: "5px 12px", borderRadius: "20px", backgroundColor: getStatusColor(order.status), color: "white", fontSize: "14px", fontWeight: "bold" }}>
//             {order.status}
//           </div>
//         </div>

//         <div style={{ padding: "20px" }}>
//           <h3 style={{ margin: "0 0 15px", color: "#2c3e50" }}>Order Items</h3>
//           {order.items.map((item) => {
//             const product = item.productId || {};
//             const productImage = product.productImage ? `http://localhost:5000${product.productImage}` : "/placeholder-image.jpg"; 
//             const productName = product.name || "Product Not Available";
//             return (
//               <div key={item._id || Math.random()} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f1f1" }}>
//                 <img src={productImage} alt={productName} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px", marginRight: "15px" }} onError={(e) => { e.target.src = "/placeholder-image.jpg"; }} />
//                 <div style={{ flex: 1 }}>
//                   <h4 style={{ margin: "0 0 5px", color: "#2c3e50" }}>{productName}</h4>
//                   <p style={{ margin: "0", color: "#7f8c8d", fontSize: "14px" }}>Quantity: {item.quantity} × ${item.price.toFixed(2)}</p>
//                 </div>
//                 <div style={{ fontWeight: "bold", color: "#2c3e50" }}>${(item.quantity * item.price).toFixed(2)}</div>
//               </div>
//             );
//           })}

//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", paddingTop: "15px", borderTop: "2px solid #e9ecef" }}>
//             <div>
//               <h4 style={{ margin: "0", color: "#2c3e50" }}>Shipping Address</h4>
//               <p style={{ margin: "5px 0 0", color: "#7f8c8d" }}>{order.fullName}<br />{order.address}<br />Phone: {order.phone}</p>
//             </div>
//             <div style={{ textAlign: "right" }}>
//               <h3 style={{ margin: "0", color: "#2c3e50" }}>Total: ${order.totalAmount.toFixed(2)}</h3>
//               <button onClick={() => openChat(order)} style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
//                 Message Seller
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );
















// // src/pages/OrderHistory.jsx
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { Rnd } from "react-rnd";
// import { io } from "socket.io-client";

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [chatOrder, setChatOrder] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const socketRef = useRef(null);
//   const navigate = useNavigate();
//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       alert("Please login first to view your orders");
//       navigate("/login");
//       return;
//     }
//     fetchOrders();
//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//     };
//   }, [navigate, token]);

//   // Update the initSocket function
// const initSocket = async () => {
//   if (socketRef.current && socketRef.current.connected) return;
  
//   const userData = await ensureUserData();
//   if (!userData) return;
  
//   // Disconnect existing socket if any
//   if (socketRef.current) {
//     socketRef.current.disconnect();
//   }
  
//   socketRef.current = io("http://localhost:5000", {
//     auth: {
//       token: token
//     }
//   });

//   socketRef.current.on("connect", () => {
//     console.log("Connected to server");
//     socketRef.current.emit("online");
//   });

//   socketRef.current.on("connect_error", (err) => {
//     console.error("Connection error:", err);
//   });

//   socketRef.current.on("receiveMessage", (msg) => {
//     if (chatOrder && (msg.senderId === chatOrder.sellerId || msg.senderId === userData.id)) {
//       const sender = msg.senderId === userData.id ? "You" : "Seller";
//       setMessages((prev) => [...prev, { sender, text: msg.text }]);
//     }
//   });
  
//   socketRef.current.on("error", (data) => {
//     console.error("Socket error:", data.message);
//   });
// };


//   const getUserData = async () => {
//     // First try to get from sessionStorage
//     const userDataStr = sessionStorage.getItem("user");
//     if (userDataStr) {
//       return JSON.parse(userDataStr);
//     }

//     // If not in sessionStorage, fetch from API
//     try {
//       const response = await axios.get('http://localhost:5000/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         const userData = {
//           id: response.data.user.id,
//           email: response.data.user.email,
//           isAdmin: response.data.user.isAdmin
//         };

//         // Store for future use
//         sessionStorage.setItem('user', JSON.stringify(userData));
//         return userData;
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }

//     return null;
//   };

//   // Add this function to properly handle user data
//   const ensureUserData = async () => {
//     try {
//       // Check if we have a token
//       if (!token) {
//         navigate("/login");
//         return null;
//       }

//       // Try to get from sessionStorage first
//       let userData = sessionStorage.getItem("user");
//       if (userData) {
//         return JSON.parse(userData);
//       }

//       // Fetch from API if not in sessionStorage
//       const response = await axios.get('http://localhost:5000/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         const userData = {
//           id: response.data.user.id,
//           email: response.data.user.email,
//           isAdmin: response.data.user.isAdmin
//         };

//         sessionStorage.setItem('user', JSON.stringify(userData));
//         return userData;
//       }
//     } catch (error) {
//       console.error('Error ensuring user data:', error);
//       // If there's an error, clear invalid data and redirect to login
//       sessionStorage.removeItem('token');
//       sessionStorage.removeItem('user');
//       navigate('/login');
//     }
//     return null;
//   };

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) setOrders(res.data.orders);
//       else setError("Failed to fetch orders");
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

// // Update the openChat function
// const openChat = async (order) => {
//   setChatOrder(order);
//   setMessages([]);
  
//   // Initialize socket
//   await initSocket();
  
//   try {
//     const userData = await ensureUserData();
//     if (!userData) return;
    
//     const res = await axios.get(`http://localhost:5000/api/messages/${order.sellerId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
    
//     if (res.data.success) {
//       const msgs = res.data.messages.map((m) => ({
//         sender: m.senderId === userData.id ? "You" : "Seller",
//         text: m.text,
//       }));
//       setMessages(msgs);
//     }
//   } catch (err) {
//     console.error("Error fetching messages:", err);
//   }
// };

//   const closeChat = () => {
//     setChatOrder(null);
//     setMessages([]);
//   };

//   // Update the handleSendMessage function
// const handleSendMessage = async () => {
//   if (!newMessage.trim() || !chatOrder) return;

//   const userData = await ensureUserData();
//   if (!userData) return;

//   if (socketRef.current && socketRef.current.connected) {
//     socketRef.current.emit("sendMessage", {
//       receiverId: chatOrder.sellerId,
//       text: newMessage,
//     });
    
//     setMessages([...messages, { sender: "You", text: newMessage }]);
//     setNewMessage("");
//   } else {
//     console.error("Socket not connected");
//     // Try to reconnect
//     await initSocket();
//     // You might want to retry sending the message here
//   }
// };

//   // Auto-scroll chat to bottom
//   const chatEndRef = useRef(null);
//   useEffect(() => {
//     if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (loading) return <Loading />;
//   if (error) return <Error message={error} retry={fetchOrders} />;

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//       <Header />
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
//         <h1 style={{ textAlign: "center", margin: "20px 0 30px", color: "#2c3e50" }}>
//           Your Order History
//         </h1>
//         {orders.length === 0 ? <NoOrders navigate={navigate} /> : <OrderList orders={orders} openChat={openChat} getStatusColor={getStatusColor} formatDate={formatDate} />}
//       </div>

//       {/* Chat Window */}
//       {chatOrder && (
//         <Rnd
//           default={{ x: window.innerWidth - 500, y: window.innerHeight - 600, width: 450, height: 500 }}
//           minWidth={350}
//           minHeight={400}
//           bounds="window"
//           style={{
//             zIndex: 1000,
//             background: "white",
//             borderRadius: "10px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div style={{
//             padding: "12px 15px",
//             backgroundColor: "#3498db",
//             color: "white",
//             borderTopLeftRadius: "10px",
//             borderTopRightRadius: "10px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "move"
//           }}>
//             <span>Chat with Seller (Order {chatOrder._id.substring(0, 6)})</span>
//             <button onClick={closeChat} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>×</button>
//           </div>

//           <div style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
//             {messages.length === 0 ? (
//               <p style={{ color: "#7f8c8d", textAlign: "center" }}>No messages yet</p>
//             ) : (
//               messages.map((msg, idx) => (
//                 <div key={idx} style={{ marginBottom: "10px", textAlign: msg.sender === "You" ? "right" : "left" }}>
//                   <span style={{
//                     display: "inline-block",
//                     padding: "10px 14px",
//                     borderRadius: "18px",
//                     backgroundColor: msg.sender === "You" ? "#3498db" : "#ecf0f1",
//                     color: msg.sender === "You" ? "white" : "#2c3e50",
//                     maxWidth: "75%",
//                     wordWrap: "break-word"
//                   }}>
//                     {msg.text}
//                   </span>
//                 </div>
//               ))
//             )}
//             <div ref={chatEndRef}></div>
//           </div>

//           <div style={{ display: "flex", borderTop: "1px solid #e0e0e0", padding: "10px" }}>
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type a message..."
//               style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//             />
//             <button
//               onClick={handleSendMessage}
//               style={{ marginLeft: "10px", backgroundColor: "#3498db", border: "none", borderRadius: "5px", color: "white", padding: "10px 14px", cursor: "pointer" }}
//             >
//               Send
//             </button>
//           </div>
//         </Rnd>
//       )}
//     </div>
//   );
// }

// // ---------- Subcomponents ----------
// const Loading = () => (
//   <div style={{ padding: "20px", textAlign: "center" }}>
//     <Header />
//     <div style={{ marginTop: "20px" }}>
//       <div style={{
//         width: "50px",
//         height: "50px",
//         border: "5px solid #f3f3f3",
//         borderTop: "5px solid #3498db",
//         borderRadius: "50%",
//         animation: "spin 1s linear infinite",
//         margin: "0 auto"
//       }}></div>
//       <p>Loading your orders...</p>
//     </div>
//   </div>
// );

// const Error = ({ message, retry }) => (
//   <div style={{ padding: "20px", textAlign: "center" }}>
//     <Header />
//     <div style={{
//       backgroundColor: "#ffebee",
//       color: "#c62828",
//       padding: "20px",
//       borderRadius: "8px",
//       marginTop: "20px",
//       maxWidth: "500px",
//       margin: "20px auto"
//     }}>
//       <h3>Error Loading Orders</h3>
//       <p>{message}</p>
//       <button
//         onClick={retry}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#c62828",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//           marginTop: "10px"
//         }}
//       >
//         Try Again
//       </button>
//     </div>
//   </div>
// );

// const NoOrders = ({ navigate }) => (
//   <div style={{ textAlign: "center", padding: "40px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
//     <h3 style={{ color: "#7f8c8d", marginBottom: "15px" }}>No orders yet</h3>
//     <p style={{ color: "#95a5a6", marginBottom: "20px" }}>
//       You haven't placed any orders yet. Start shopping to see your orders here!
//     </p>
//     <button
//       onClick={() => navigate("/")}
//       style={{
//         padding: "10px 20px",
//         backgroundColor: "#3498db",
//         color: "white",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//         fontSize: "16px"
//       }}
//     >
//       Start Shopping
//     </button>
//   </div>
// );

// const OrderList = ({ orders, openChat, getStatusColor, formatDate }) => (
//   <div>
//     {orders.map((order) => (
//       <div key={order._id} style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginBottom: "20px", overflow: "hidden" }}>
//         <div style={{ padding: "15px 20px", backgroundColor: "#f8f9fa", borderBottom: "1px solid #e9ecef", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
//           <div><strong>Order ID:</strong> {order._id.substring(0, 8)}...</div>
//           <div><strong>Date:</strong> {formatDate(order.createdAt)}</div>
//           <div style={{ padding: "5px 12px", borderRadius: "20px", backgroundColor: getStatusColor(order.status), color: "white", fontSize: "14px", fontWeight: "bold" }}>
//             {order.status}
//           </div>
//         </div>

//         <div style={{ padding: "20px" }}>
//           <h3 style={{ margin: "0 0 15px", color: "#2c3e50" }}>Order Items</h3>
//           {order.items.map((item) => {
//             const product = item.productId || {};
//             const productImage = product.productImage ? `http://localhost:5000${product.productImage}` : "/placeholder-image.jpg";
//             const productName = product.name || "Product Not Available";
//             return (
//               <div key={item._id || Math.random()} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f1f1" }}>
//                 <img src={productImage} alt={productName} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px", marginRight: "15px" }} onError={(e) => { e.target.src = "/placeholder-image.jpg"; }} />
//                 <div style={{ flex: 1 }}>
//                   <h4 style={{ margin: "0 0 5px", color: "#2c3e50" }}>{productName}</h4>
//                   <p style={{ margin: "0", color: "#7f8c8d", fontSize: "14px" }}>Quantity: {item.quantity} × ${item.price.toFixed(2)}</p>
//                 </div>
//                 <div style={{ fontWeight: "bold", color: "#2c3e50" }}>${(item.quantity * item.price).toFixed(2)}</div>
//               </div>
//             );
//           })}

//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", paddingTop: "15px", borderTop: "2px solid #e9ecef" }}>
//             <div>
//               <h4 style={{ margin: "0", color: "#2c3e50" }}>Shipping Address</h4>
//               <p style={{ margin: "5px 0 0", color: "#7f8c8d" }}>{order.fullName}<br />{order.address}<br />Phone: {order.phone}</p>
//             </div>
//             <div style={{ textAlign: "right" }}>
//               <h3 style={{ margin: "0", color: "#2c3e50" }}>Total: ${order.totalAmount.toFixed(2)}</h3>
//               <button onClick={() => openChat(order)} style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
//                 Message Seller
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// ); 



















// // src/pages/OrderHistory.jsx
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { Rnd } from "react-rnd";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   auth: {
//     token: sessionStorage.getItem("token"), // send token during handshake
//   },
// });

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [chatOrder, setChatOrder] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const navigate = useNavigate();
//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       alert("Please login first to view your orders");
//       navigate("/login");
//       return;
//     }

//     fetchOrders();
//   }, [navigate, token,]);

//   const ensureUserData = async () => {
//     try {
//       if (!token) {
//         navigate("/login");
//         return null;
//       }

//       let userData = sessionStorage.getItem("user");
//       if (userData) {
//         return JSON.parse(userData);
//       }

//       const response = await axios.get('http://localhost:5000/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         const userData = {
//           id: response.data.user.id,
//           email: response.data.user.email,
//           isAdmin: response.data.user.isAdmin
//         };

//         sessionStorage.setItem('user', JSON.stringify(userData));
//         return userData;
//       }
//     } catch (error) {
//       console.error('Error ensuring user data:', error);
//       sessionStorage.removeItem('token');
//       sessionStorage.removeItem('user');
//       navigate('/login');
//     }
//     return null;
//   };

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) setOrders(res.data.orders);
//       else setError("Failed to fetch orders");
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
//       case "Cancelled by customer": return "#f44336";
//       case "Cancelled by seller": return "#f44336";
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

//   const openChat = async (order) => {
//     setChatOrder(order);
//     setMessages([]);
    
//     try {
//       const userData = await ensureUserData();
//       if (!userData) return;
      
//       const res = await axios.get(`http://localhost:5000/api/messages/order/${order._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       if (res.data.success) {
//         const msgs = res.data.messages.map((m) => ({
//           sender: m.senderId._id === userData.id ? "You" : "Seller",
//           text: m.text,
//           createdAt: m.createdAt
//         }));
//         setMessages(msgs);
//       }
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   const closeChat = () => {
//     setChatOrder(null);
//     setMessages([]);
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !chatOrder) return;

//     const userData = await ensureUserData();
//     if (!userData) return;

//     try {
//       // Get the seller ID from the first item in the order
//       const sellerId = chatOrder.items[0]?.sellerId?._id || chatOrder.items[0]?.sellerId;
      
//       const res = await axios.post("http://localhost:5000/api/messages", {
//         receiverId: sellerId,
//         text: newMessage,
//         orderId: chatOrder._id
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         setMessages([...messages, { 
//           sender: "You", 
//           text: newMessage,
//           createdAt: new Date() 
//         }]);
//         setNewMessage("");
//       }
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };



//   const cancelOrder = async (orderId) => {
//     try {
//       const res = await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         fetchOrders(); // Refresh orders
//         alert("Order cancelled successfully");
//       }
//     } catch (err) {
//       console.error("Error cancelling order:", err);
//       alert(err.response?.data?.message || "Failed to cancel order");
//     }
//   };

//   const chatEndRef = useRef(null);
//   useEffect(() => {
//     if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (loading) return <Loading />;
//   if (error) return <Error message={error} retry={fetchOrders} />;

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//       <Header />
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
//         <h1 style={{ textAlign: "center", margin: "20px 0 30px", color: "#2c3e50" }}>
//           Your Order History
//         </h1>
//         {orders.length === 0 ? <NoOrders navigate={navigate} /> : 
//           <OrderList 
//             orders={orders} 
//             openChat={openChat} 
//             getStatusColor={getStatusColor} 
//             formatDate={formatDate}
//             cancelOrder={cancelOrder}
//           />}
//       </div>

//       {/* Chat Window */}
//       {chatOrder && (
//         <Rnd
//           default={{ x: window.innerWidth - 500, y: window.innerHeight - 600, width: 450, height: 500 }}
//           minWidth={350}
//           minHeight={400}
//           bounds="window"
//           style={{
//             zIndex: 1000,
//             background: "white",
//             borderRadius: "10px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div style={{
//             padding: "12px 15px",
//             backgroundColor: "#3498db",
//             color: "white",
//             borderTopLeftRadius: "10px",
//             borderTopRightRadius: "10px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "move"
//           }}>
//             <span>Chat about Order {chatOrder._id.substring(0, 6)}</span>
//             <button onClick={closeChat} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>×</button>
//           </div>

//           <div style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
//             {messages.length === 0 ? (
//               <p style={{ color: "#7f8c8d", textAlign: "center" }}>No messages yet</p>
//             ) : (
//               messages.map((msg, idx) => (
//                 <div key={idx} style={{ marginBottom: "10px", textAlign: msg.sender === "You" ? "right" : "left" }}>
//                   <span style={{
//                     display: "inline-block",
//                     padding: "10px 14px",
//                     borderRadius: "18px",
//                     backgroundColor: msg.sender === "You" ? "#3498db" : "#ecf0f1",
//                     color: msg.sender === "You" ? "white" : "#2c3e50",
//                     maxWidth: "75%",
//                     wordWrap: "break-word"
//                   }}>
//                     {msg.text}
//                   </span>
//                   <div style={{ fontSize: "12px", color: "#7f8c8d", marginTop: "4px" }}>
//                     {msg.sender} • {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ''}
//                   </div>
//                 </div>
//               ))
//             )}
//             <div ref={chatEndRef}></div>
//           </div>

//           <div style={{ display: "flex", borderTop: "1px solid #e0e0e0", padding: "10px" }}>
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type a message..."
//               style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//             />
//             <button
//               onClick={handleSendMessage}
//               style={{ marginLeft: "10px", backgroundColor: "#3498db", border: "none", borderRadius: "5px", color: "white", padding: "10px 14px", cursor: "pointer" }}
//             >
//               Send
//             </button>
//           </div>
//         </Rnd>
//       )}
//     </div>
//   );
// }









// // src/pages/OrderHistory.jsx
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { Rnd } from "react-rnd";
// import { useSocket } from "../context/SocketContext";

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [chatOrder, setChatOrder] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const navigate = useNavigate();
//   const token = sessionStorage.getItem("token");
//   const { socket } = useSocket();

//   useEffect(() => {
//     if (!token) {
//       alert("Please login first to view your orders");
//       navigate("/login");
//       return;
//     }
//     fetchOrders();
//   }, [navigate, token]);

//   useEffect(() => {
//     if (socket && orders.length > 0) {
//       // Join rooms for all orders
//       const orderIds = orders.map(order => order._id);
//       socket.emit("join-order-rooms", orderIds);
      
//       // Listen for new messages
//       socket.on("receive-message", (message) => {
//         if (message.orderId === chatOrder?._id) {
//           setMessages(prev => [...prev, message]);
//         }
//       });
      
//       return () => {
//         socket.off("receive-message");
//       };
//     }
//   }, [socket, orders, chatOrder]);

//   const ensureUserData = async () => {
//     try {
//       if (!token) {
//         navigate("/login");
//         return null;
//       }

//       let userData = sessionStorage.getItem("user");
//       if (userData) {
//         return JSON.parse(userData);
//       }

//       const response = await axios.get('http://localhost:5000/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         const userData = {
//           id: response.data.user.id,
//           email: response.data.user.email,
//           isAdmin: response.data.user.isAdmin
//         };

//         sessionStorage.setItem('user', JSON.stringify(userData));
//         return userData;
//       }
//     } catch (error) {
//       console.error('Error ensuring user data:', error);
//       sessionStorage.removeItem("token");
//       sessionStorage.removeItem("user");
//       navigate('/login');
//     }
//     return null;
//   };

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) setOrders(res.data.orders);
//       else setError("Failed to fetch orders");
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
//       case "Cancelled by customer": return "#f44336";
//       case "Cancelled by seller": return "#f44336";
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

//   const openChat = async (order) => {
//     setChatOrder(order);
//     setMessages([]);
    
//     try {
//       const userData = await ensureUserData();
//       if (!userData) return;
      
//       const res = await axios.get(`http://localhost:5000/api/messages/order/${order._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       if (res.data.success) {
//         const msgs = res.data.messages.map((m) => ({
//           _id: m._id,
//           senderId: m.senderId,
//           sender: m.senderId._id === userData.id ? "You" : m.senderId.email,
//           text: m.text,
//           createdAt: m.createdAt
//         }));
//         setMessages(msgs);
//       }
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   const closeChat = () => {
//     setChatOrder(null);
//     setMessages([]);
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !chatOrder || !socket) return;

//     const userData = await ensureUserData();
//     if (!userData) return;

//     try {
//       // Get the seller ID from the first item in the order
//       const sellerId = chatOrder.items[0]?.sellerId?._id || chatOrder.items[0]?.sellerId;
      
//       // Send message via socket
//       socket.emit("send-message", {
//         receiverId: sellerId,
//         text: newMessage,
//         orderId: chatOrder._id
//       });
      
//       // Optimistically add message to UI
//       setMessages([...messages, { 
//         _id: Date.now(), // Temporary ID
//         senderId: { _id: userData.id },
//         sender: "You", 
//         text: newMessage,
//         createdAt: new Date() 
//       }]);
//       setNewMessage("");
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     try {
//       const res = await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         fetchOrders(); // Refresh orders
//         alert("Order cancelled successfully");
//       }
//     } catch (err) {
//       console.error("Error cancelling order:", err);
//       alert(err.response?.data?.message || "Failed to cancel order");
//     }
//   };

//   const chatEndRef = useRef(null);
//   useEffect(() => {
//     if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (loading) return <Loading />;
//   if (error) return <Error message={error} retry={fetchOrders} />;

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//       <Header />
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
//         <h1 style={{ textAlign: "center", margin: "20px 0 30px", color: "#2c3e50" }}>
//           Your Order History
//         </h1>
//         {orders.length === 0 ? <NoOrders navigate={navigate} /> : 
//           <OrderList 
//             orders={orders} 
//             openChat={openChat} 
//             getStatusColor={getStatusColor} 
//             formatDate={formatDate}
//             cancelOrder={cancelOrder}
//           />}
//       </div>

//       {/* Chat Window */}
//       {chatOrder && (
//         <Rnd
//           default={{ x: window.innerWidth - 500, y: window.innerHeight - 600, width: 450, height: 500 }}
//           minWidth={350}
//           minHeight={400}
//           bounds="window"
//           style={{
//             zIndex: 1000,
//             background: "white",
//             borderRadius: "10px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div style={{
//             padding: "12px 15px",
//             backgroundColor: "#3498db",
//             color: "white",
//             borderTopLeftRadius: "10px",
//             borderTopRightRadius: "10px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "move"
//           }}>
//             <span>Chat about Order {chatOrder._id.substring(0, 6)}</span>
//             <button onClick={closeChat} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>×</button>
//           </div>

//           <div style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
//             {messages.length === 0 ? (
//               <p style={{ color: "#7f8c8d", textAlign: "center" }}>No messages yet</p>
//             ) : (
//               messages.map((msg) => (
//                 <div key={msg._id} style={{ marginBottom: "10px", textAlign: msg.sender === "You" ? "right" : "left" }}>
//                   <span style={{
//                     display: "inline-block",
//                     padding: "10px 14px",
//                     borderRadius: "18px",
//                     backgroundColor: msg.sender === "You" ? "#3498db" : "#ecf0f1",
//                     color: msg.sender === "You" ? "white" : "#2c3e50",
//                     maxWidth: "75%",
//                     wordWrap: "break-word"
//                   }}>
//                     {msg.text}
//                   </span>
//                   <div style={{ fontSize: "12px", color: "#7f8c8d", marginTop: "4px" }}>
//                     {msg.sender} • {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ''}
//                   </div>
//                 </div>
//               ))
//             )}
//             <div ref={chatEndRef}></div>
//           </div>

//           <div style={{ display: "flex", borderTop: "1px solid #e0e0e0", padding: "10px" }}>
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type a message..."
//               style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//             />
//             <button
//               onClick={handleSendMessage}
//               style={{ marginLeft: "10px", backgroundColor: "#3498db", border: "none", borderRadius: "5px", color: "white", padding: "10px 14px", cursor: "pointer" }}
//             >
//               Send
//             </button>
//           </div>
//         </Rnd>
//       )}
//     </div>
//   );
// }


// src/pages/OrderHistory.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Rnd } from "react-rnd";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  const [chatOrder, setChatOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const navigate = useNavigate();
  const { socket } = useSocket();
  const { user, token, loading } = useAuth(); // ✅ get from AuthContext

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !token) {
      alert("Please login first to view your orders");
      navigate("/login");
    } else if (token) {
      fetchOrders();
    }
  }, [navigate, token, loading]);

  useEffect(() => {
    if (socket && orders.length > 0) {
      const orderIds = orders.map((order) => order._id);
      socket.emit("join-order-rooms", orderIds);

      socket.on("receive-message", (message) => {
        if (message.orderId === chatOrder?._id) {
          setMessages((prev) => [...prev, message]);
        }
      });

      return () => {
        socket.off("receive-message");
      };
    }
  }, [socket, orders, chatOrder]);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setOrders(res.data.orders);
      else setError("Failed to fetch orders");
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ff9800";
      case "Processing":
        return "#2196f3";
      case "Shipped":
        return "#4caf50";
      case "Delivered":
        return "#2e7d32";
      case "Cancelled by customer":
      case "Cancelled by seller":
        return "#f44336";
      default:
        return "#757575";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openChat = async (order) => {
    if (!user) return;
    setChatOrder(order);
    setMessages([]);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/order/${order._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        const msgs = res.data.messages.map((m) => ({
          _id: m._id,
          senderId: m.senderId,
          sender: m.senderId._id === user.id ? "You" : m.senderId.email,
          text: m.text,
          createdAt: m.createdAt,
        }));
        setMessages(msgs);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const closeChat = () => {
    setChatOrder(null);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chatOrder || !socket || !user) return;

    try {
      const sellerId =
        chatOrder.items[0]?.sellerId?._id || chatOrder.items[0]?.sellerId;

      socket.emit("send-message", {
        receiverId: sellerId,
        text: newMessage,
        orderId: chatOrder._id,
      });

      setMessages([
        ...messages,
        {
          _id: Date.now(),
          senderId: { _id: user.id },
          sender: "You",
          text: newMessage,
          createdAt: new Date(),
        },
      ]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        fetchOrders();
        alert("Order cancelled successfully");
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  const chatEndRef = useRef(null);
  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading || loadingOrders) return <Loading />;
  if (error) return <Error message={error} retry={fetchOrders} />;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Header />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <h1
          style={{
            textAlign: "center",
            margin: "20px 0 30px",
            color: "#2c3e50",
          }}
        >
          Your Order History
        </h1>
        {orders.length === 0 ? (
          <NoOrders navigate={navigate} />
        ) : (
          <OrderList
            orders={orders}
            openChat={openChat}
            getStatusColor={getStatusColor}
            formatDate={formatDate}
            cancelOrder={cancelOrder}
          />
        )}
      </div>

      {/* Chat Window */}
      {chatOrder && (
        <Rnd
          default={{
            x: window.innerWidth - 500,
            y: window.innerHeight - 600,
            width: 450,
            height: 500,
          }}
          minWidth={350}
          minHeight={400}
          bounds="window"
          style={{
            zIndex: 1000,
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "12px 15px",
              backgroundColor: "#3498db",
              color: "white",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "move",
            }}
          >
            <span>Chat about Order {chatOrder._id.substring(0, 6)}</span>
            <button
              onClick={closeChat}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <div style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
            {messages.length === 0 ? (
              <p style={{ color: "#7f8c8d", textAlign: "center" }}>
                No messages yet
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  style={{
                    marginBottom: "10px",
                    textAlign: msg.sender === "You" ? "right" : "left",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 14px",
                      borderRadius: "18px",
                      backgroundColor:
                        msg.sender === "You" ? "#3498db" : "#ecf0f1",
                      color: msg.sender === "You" ? "white" : "#2c3e50",
                      maxWidth: "75%",
                      wordWrap: "break-word",
                    }}
                  >
                    {msg.text}
                  </span>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#7f8c8d",
                      marginTop: "4px",
                    }}
                  >
                    {msg.sender} •{" "}
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString()
                      : ""}
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef}></div>
          </div>

          <div
            style={{
              display: "flex",
              borderTop: "1px solid #e0e0e0",
              padding: "10px",
            }}
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              style={{
                marginLeft: "10px",
                backgroundColor: "#3498db",
                border: "none",
                borderRadius: "5px",
                color: "white",
                padding: "10px 14px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </Rnd>
      )}
    </div>
  );
}
// ... (rest of the component remains the same).....
// ---------- Subcomponents ----------
const Loading = () => (
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

const Error = ({ message, retry }) => (
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
      <p>{message}</p>
      <button
        onClick={retry}
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

const NoOrders = ({ navigate }) => (
  <div style={{ textAlign: "center", padding: "40px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
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
);

const OrderList = ({ orders, openChat, getStatusColor, formatDate, cancelOrder }) => (
  <div>
    {orders.map((order) => (
      <div key={order._id} style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginBottom: "20px", overflow: "hidden" }}>
        <div style={{ padding: "15px 20px", backgroundColor: "#f8f9fa", borderBottom: "1px solid #e9ecef", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <div><strong>Order ID:</strong> {order._id.substring(0, 8)}...</div>
          <div><strong>Date:</strong> {formatDate(order.createdAt)}</div>
          <div style={{ padding: "5px 12px", borderRadius: "20px", backgroundColor: getStatusColor(order.status), color: "white", fontSize: "14px", fontWeight: "bold" }}>
            {order.status}
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          <h3 style={{ margin: "0 0 15px", color: "#2c3e50" }}>Order Items</h3>
          {order.items.map((item) => {
            const product = item.productId || {};
            const productImage = product.productImage ? `http://localhost:5000${product.productImage}` : "/placeholder-image.jpg";
            const productName = product.name || "Product Not Available";
            return (
              <div key={item._id || Math.random()} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f1f1" }}>
                <img src={productImage} alt={productName} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px", marginRight: "15px" }} onError={(e) => { e.target.src = "/placeholder-image.jpg"; }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px", color: "#2c3e50" }}>{productName}</h4>
                  <p style={{ margin: "0", color: "#7f8c8d", fontSize: "14px" }}>Quantity: {item.quantity} × ${item.price.toFixed(2)}</p>
                  <p style={{ margin: "0", color: "#7f8c8d", fontSize: "12px" }}>Seller: {item.sellerId?.email || "Unknown"}</p>
                </div>
                <div style={{ fontWeight: "bold", color: "#2c3e50" }}>${(item.quantity * item.price).toFixed(2)}</div>
              </div>
            );
          })}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", paddingTop: "15px", borderTop: "2px solid #e9ecef" }}>
            <div>
              <h4 style={{ margin: "0", color: "#2c3e50" }}>Shipping Address</h4>
              <p style={{ margin: "5px 0 0", color: "#7f8c8d" }}>{order.fullName}<br />{order.address}<br />Phone: {order.phone}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h3 style={{ margin: "0", color: "#2c3e50" }}>Total: ${order.totalAmount.toFixed(2)}</h3>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button onClick={() => openChat(order)} style={{ padding: "8px 16px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Message Seller
                </button>
                {(order.status === "Pending" || order.status === "Processing") && (
                  <button onClick={() => cancelOrder(order._id)} style={{ padding: "8px 16px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);