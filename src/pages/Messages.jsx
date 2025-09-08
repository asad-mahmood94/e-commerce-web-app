// import { useState } from "react";

// export default function ChatWindow() {
//   const users = [
//     { id: 1, name: "John Doe", email: "john@example.com", orderId: "ORD123" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com", orderId: "ORD456" },
//     { id: 3, name: "Mike Ross", email: "mike@example.com", orderId: "ORD789" },
//   ];

//   const [selectedUser, setSelectedUser] = useState(users[0]);
//   const [messages, setMessages] = useState({
//     1: [
//       { id: 1, sender: "user", text: "Hello Admin!" },
//       { id: 2, sender: "admin", text: "Hi John, how can I help you?" },
//     ],
//     2: [
//       { id: 1, sender: "user", text: "Is my order shipped?" },
//       { id: 2, sender: "admin", text: "Yes Jane, your order is on the way!" },
//     ],
//     3: [
//       { id: 1, sender: "user", text: "Can I change my delivery address?" },
//       { id: 2, sender: "admin", text: "Sure Mike, please provide the new address." },
//     ],
//   });

//   const [newMessage, setNewMessage] = useState("");

//   const handleSend = () => {
//     if (!newMessage.trim()) return;
//     setMessages({
//       ...messages,
//       [selectedUser.id]: [
//         ...messages[selectedUser.id],
//         { id: Date.now(), sender: "admin", text: newMessage },
//       ],
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="chat-wrapper">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h3>Users</h3>
//         <ul>
//           {users.map((user) => (
//             <li
//               key={user.id}
//               className={`user-item ${selectedUser.id === user.id ? "active" : ""}`}
//               onClick={() => setSelectedUser(user)}
//             >
//               <div className="user-name">{user.name}</div>
//               <div className="user-info">{user.email}</div>
//               <div className="user-info">Order: {user.orderId}</div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Section */}
//       <div className="chat-container">
//         <div className="chat-header">Chat with {selectedUser.name}</div>

//         <div className="chat-body">
//           {messages[selectedUser.id].map((msg) => (
//             <div
//               key={msg.id}
//               className={`message ${msg.sender === "admin" ? "admin" : "user"}`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>

//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button onClick={handleSend}>Send</button>
//         </div>
//       </div>

//       <style>{`
//         .chat-wrapper {
//           display: flex;
//           height: 90vh;
//           border: 1px solid #ccc;
//           border-radius: 8px;
//           overflow: hidden;
//           font-family: Arial, sans-serif;
//         }
//         .sidebar {
//           width: 260px;
//           background: #f8f9fa;
//           padding: 15px;
//           border-right: 1px solid #ddd;
//           overflow-y: auto;
//         }
//         .sidebar h3 {
//           margin-bottom: 15px;
//           font-size: 18px;
//           color: #333;
//           border-bottom: 1px solid #ddd;
//           padding-bottom: 8px;
//         }
//         .sidebar ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }
//         .user-item {
//           padding: 12px;
//           margin-bottom: 10px;
//           background: #fff;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.2s;
//           border: 1px solid #eee;
//         }
//         .user-item:hover {
//           background: #e9f3ff;
//         }
//         .user-item.active {
//           background: #007bff;
//           color: white;
//           border: 1px solid #0056b3;
//         }
//         .user-name {
//           font-weight: bold;
//         }
//         .user-info {
//           font-size: 12px;
//           color: #666;
//         }
//         .user-item.active .user-info {
//           color: #f1f1f1;
//         }
//         .chat-container {
//           display: flex;
//           flex-direction: column;
//           flex: 1;
//         }
//         .chat-header {
//           background: #007bff;
//           color: white;
//           padding: 12px;
//           font-weight: bold;
//           text-align: center;
//         }
//         .chat-body {
//           flex: 1;
//           padding: 10px;
//           overflow-y: auto;
//           background: #f9f9f9;
//         }
//         .message {
//           padding: 10px 14px;
//           margin: 6px 0;
//           border-radius: 16px;
//           max-width: 70%;
//           font-size: 14px;
//           line-height: 1.4;
//         }
//         .message.user {
//           background: #e4e6eb;
//           align-self: flex-start;
//         }
//         .message.admin {
//           background: #007bff;
//           color: white;
//           align-self: flex-end;
//         }
//         .chat-input {
//           display: flex;
//           padding: 10px;
//           border-top: 1px solid #ccc;
//           background: #fff;
//         }
//         .chat-input input {
//           flex: 1;
//           padding: 10px;
//           border: 1px solid #ccc;
//           border-radius: 20px;
//           margin-right: 8px;
//           outline: none;
//         }
//         .chat-input button {
//           padding: 10px 18px;
//           background: #007bff;
//           color: white;
//           border: none;
//           border-radius: 20px;
//           cursor: pointer;
//           transition: background 0.2s;
//         }
//         .chat-input button:hover {
//           background: #0056b3;
//         }

//         /* Responsive */
//         @media (max-width: 768px) {
//           .chat-wrapper {
//             flex-direction: column;
//           }
//           .sidebar {
//             width: 100%;
//             border-right: none;
//             border-bottom: 1px solid #ddd;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }








// // src/pages/Messages.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// export default function Messages() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [newMessage, setNewMessage] = useState("");
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return;

//     fetchUsers();
//     initSocket();

//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//     };
//   }, [token]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) {
//         setUsers(res.data.users);
//         if (res.data.users.length) setSelectedUser(res.data.users[0]);
//       }
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   const initSocket = () => {
//     socketRef.current = io("http://localhost:5000");

//     // Listen for incoming messages
//     socketRef.current.on("receiveMessage", (msg) => {
//       setMessages((prev) => {
//         const userMsgs = prev[msg.senderId] || [];
//         return {
//           ...prev,
//           [msg.senderId]: [...userMsgs, { id: Date.now(), sender: "user", text: msg.text }],
//         };
//       });
//     });
//   };

//   useEffect(() => {
//     // Fetch messages for selected user
//     if (!selectedUser || !token) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/messages/${selectedUser.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data.success) {
//           setMessages((prev) => ({
//             ...prev,
//             [selectedUser.id]: res.data.messages.map((m) => ({
//               id: m._id,
//               sender: m.senderId === selectedUser.id ? "user" : "admin",
//               text: m.text,
//             })),
//           }));
//         }
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//       }
//     };
//     fetchMessages();
//   }, [selectedUser, token]);

//   const handleSend = () => {
//     if (!newMessage.trim() || !selectedUser) return;

//     const msgObj = {
//       senderId: "admin",
//       receiverId: selectedUser.id,
//       text: newMessage,
//     };

//     socketRef.current.emit("sendMessage", msgObj);

//     setMessages((prev) => {
//       const userMsgs = prev[selectedUser.id] || [];
//       return {
//         ...prev,
//         [selectedUser.id]: [...userMsgs, { id: Date.now(), sender: "admin", text: newMessage }],
//       };
//     });

//     setNewMessage("");
//   };

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, selectedUser]);

//   return (
//     <div className="chat-wrapper">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h3>Users</h3>
//         <ul>
//           {users.map((user) => (
//             <li
//               key={user.id}
//               className={`user-item ${selectedUser?.id === user.id ? "active" : ""}`}
//               onClick={() => setSelectedUser(user)}
//             >
//               <div className="user-name">{user.name}</div>
//               <div className="user-info">{user.email}</div>
//               <div className="user-info">Order: {user.orderId || "-"}</div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Section */}
//       <div className="chat-container">
//         <div className="chat-header">
//           {selectedUser ? `Chat with ${selectedUser.name}` : "Select a user to start chat"}
//         </div>

//         <div className="chat-body">
//           {selectedUser && messages[selectedUser.id]
//             ? messages[selectedUser.id].map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`message ${msg.sender === "admin" ? "admin" : "user"}`}
//                 >
//                   {msg.text}
//                 </div>
//               ))
//             : <p style={{ textAlign: "center", color: "#999" }}>No messages yet</p>}
//           <div ref={messagesEndRef}></div>
//         </div>

//         {selectedUser && (
//           <div className="chat-input">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button onClick={handleSend}>Send</button>
//           </div>
//         )}
//       </div>

//       <style>{`
//         .chat-wrapper {
//           display: flex;
//           height: 90vh;
//           border: 1px solid #ccc;
//           border-radius: 8px;
//           overflow: hidden;
//           font-family: Arial, sans-serif;
//         }
//         .sidebar {
//           width: 260px;
//           background: #f8f9fa;
//           padding: 15px;
//           border-right: 1px solid #ddd;
//           overflow-y: auto;
//         }
//         .sidebar h3 {
//           margin-bottom: 15px;
//           font-size: 18px;
//           color: #333;
//           border-bottom: 1px solid #ddd;
//           padding-bottom: 8px;
//         }
//         .sidebar ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }
//         .user-item {
//           padding: 12px;
//           margin-bottom: 10px;
//           background: #fff;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.2s;
//           border: 1px solid #eee;
//         }
//         .user-item:hover {
//           background: #e9f3ff;
//         }
//         .user-item.active {
//           background: #007bff;
//           color: white;
//           border: 1px solid #0056b3;
//         }
//         .user-name {
//           font-weight: bold;
//         }
//         .user-info {
//           font-size: 12px;
//           color: #666;
//         }
//         .user-item.active .user-info {
//           color: #f1f1f1;
//         }
//         .chat-container {
//           display: flex;
//           flex-direction: column;
//           flex: 1;
//         }
//         .chat-header {
//           background: #007bff;
//           color: white;
//           padding: 12px;
//           font-weight: bold;
//           text-align: center;
//         }
//         .chat-body {
//           flex: 1;
//           padding: 10px;
//           overflow-y: auto;
//           background: #f9f9f9;
//         }
//         .message {
//           padding: 10px 14px;
//           margin: 6px 0;
//           border-radius: 16px;
//           max-width: 70%;
//           font-size: 14px;
//           line-height: 1.4;
//         }
//         .message.user {
//           background: #e4e6eb;
//           align-self: flex-start;
//         }
//         .message.admin {
//           background: #007bff;
//           color: white;
//           align-self: flex-end;
//         }
//         .chat-input {
//           display: flex;
//           padding: 10px;
//           border-top: 1px solid #ccc;
//           background: #fff;
//         }
//         .chat-input input {
//           flex: 1;
//           padding: 10px;
//           border: 1px solid #ccc;
//           border-radius: 20px;
//           margin-right: 8px;
//           outline: none;
//         }
//         .chat-input button {
//           padding: 10px 18px;
//           background: #007bff;
//           color: white;
//           border: none;
//           border-radius: 20px;
//           cursor: pointer;
//           transition: background 0.2s;
//         }
//         .chat-input button:hover {
//           background: #0056b3;
//         }
//         @media (max-width: 768px) {
//           .chat-wrapper {
//             flex-direction: column;
//           }
//           .sidebar {
//             width: 100%;
//             border-right: none;
//             border-bottom: 1px solid #ddd;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }













// // src/pages/Messages.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// export default function Messages() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [newMessage, setNewMessage] = useState("");
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return;

//     fetchUsers();
//     initSocket();

//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//     };
//   }, [token]);

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

//   // Update the initSocket function in Messages.jsx
//   const initSocket = async () => {
//     if (socketRef.current) return;

//     const userData = await getUserData();
//     if (!userData) return;

//     socketRef.current = io("http://localhost:5000", {
//       auth: {
//         token: token
//       }
//     });

//     socketRef.current.on("connect", () => {
//       console.log("Connected to server as admin");
//       socketRef.current.emit("online");
//     });

//     socketRef.current.on("connect_error", (err) => {
//       console.error("Connection error:", err);
//     });

//     socketRef.current.on("receiveMessage", (msg) => {
//       setMessages((prev) => {
//         const userMsgs = prev[msg.senderId] || [];
//         return {
//           ...prev,
//           [msg.senderId]: [...userMsgs, {
//             id: msg._id || Date.now(),
//             sender: "user",
//             text: msg.text,
//             createdAt: msg.createdAt
//           }],
//         };
//       });
//     });
//   };


//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) {
//         setUsers(res.data.users);
//         if (res.data.users.length) setSelectedUser(res.data.users[0]);
//       }
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   useEffect(() => {
//     // Fetch messages for selected user
//     if (!selectedUser || !token) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/messages/${selectedUser.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data.success) {
//           setMessages((prev) => ({
//             ...prev,
//             [selectedUser.id]: res.data.messages.map((m) => ({
//               id: m._id,
//               sender: m.senderId === selectedUser.id ? "user" : "admin",
//               text: m.text,
//             })),
//           }));
//         }
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//       }
//     };
//     fetchMessages();
//   }, [selectedUser, token]);

//   // Update the handleSend function
//   const handleSend = async () => {
//     if (!newMessage.trim() || !selectedUser) return;

//     const userData = await getUserData();
//     if (!userData) return;

//     if (socketRef.current && socketRef.current.connected) {
//       socketRef.current.emit("sendMessage", {
//         receiverId: selectedUser.id,
//         text: newMessage,
//       });

//       setMessages((prev) => {
//         const userMsgs = prev[selectedUser.id] || [];
//         return {
//           ...prev,
//           [selectedUser.id]: [...userMsgs, {
//             id: Date.now(),
//             sender: "admin",
//             text: newMessage,
//             createdAt: new Date()
//           }],
//         };
//       });

//       setNewMessage("");
//     } else {
//       console.error("Socket not connected");
//       await initSocket();
//     }
//   };

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, selectedUser]);

//   return (
//     <div className="chat-wrapper">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h3>Users</h3>
//         <ul>
//           {users.map((user) => (
//             <li
//               key={user.id}
//               className={`user-item ${selectedUser?.id === user.id ? "active" : ""}`}
//               onClick={() => setSelectedUser(user)}
//             >
//               <div className="user-name">{user.name}</div>
//               <div className="user-info">{user.email}</div>
//               <div className="user-info">Order: {user.orderId || "-"}</div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Section */}
//       <div className="chat-container">
//         <div className="chat-header">
//           {selectedUser ? `Chat with ${selectedUser.name}` : "Select a user to start chat"}
//         </div>

//         <div className="chat-body">
//           {/* {selectedUser && messages[selectedUser.id]
//             ? messages[selectedUser.id].map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`message ${msg.sender === "admin" ? "admin" : "user"}`}
//                 >
//                   {msg.text}
//                 </div>
//               ))
//             : <p style={{ textAlign: "center", color: "#999" }}>No messages yet</p>} */}

//           {selectedUser && messages[selectedUser.id]?.map((msg) => (
//             <div
//               key={msg.id}
//               className={`message ${msg.sender === "admin" ? "admin" : "user"}`}
//             >
//               <div className="message-text">{msg.text}</div>
//               <div className="message-time">
//                 {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ''}
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef}></div>
//         </div>

//         {selectedUser && (
//           <div className="chat-input">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button onClick={handleSend}>Send</button>
//           </div>
//         )}
//       </div>

//       <style>{`
//         .chat-wrapper {
//           display: flex;
//           height: 90vh;
//           border: 1px solid #ccc;
//           border-radius: 8px;
//           overflow: hidden;
//           font-family: Arial, sans-serif;
//         }
//         .sidebar {
//           width: 260px;
//           background: #f8f9fa;
//           padding: 15px;
//           border-right: 1px solid #ddd;
//           overflow-y: auto;
//         }
//         .sidebar h3 {
//           margin-bottom: 15px;
//           font-size: 18px;
//           color: #333;
//           border-bottom: 1px solid #ddd;
//           padding-bottom: 8px;
//         }
//         .sidebar ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }
//         .user-item {
//           padding: 12px;
//           margin-bottom: 10px;
//           background: #fff;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.2s;
//           border: 1px solid #eee;
//         }
//         .user-item:hover {
//           background: #e9f3ff;
//         }
//         .user-item.active {
//           background: #007bff;
//           color: white;
//           border: 1px solid #0056b3;
//         }
//         .user-name {
//           font-weight: bold;
//         }
//         .user-info {
//           font-size: 12px;
//           color: #666;
//         }
//         .user-item.active .user-info {
//           color: #f1f1f1;
//         }
//         .chat-container {
//           display: flex;
//           flex-direction: column;
//           flex: 1;
//         }
//         .chat-header {
//           background: #007bff;
//           color: white;
//           padding: 12px;
//           font-weight: bold;
//           text-align: center;
//         }
//         .chat-body {
//           flex: 1;
//           padding: 10px;
//           overflow-y: auto;
//           background: #f9f9f9;
//         }
//         .message {
//           padding: 10px 14px;
//           margin: 6px 0;
//           border-radius: 16px;
//           max-width: 70%;
//           font-size: 14px;
//           line-height: 1.4;
//         }
//         .message.user {
//           background: #e4e6eb;
//           align-self: flex-start;
//         }
//         .message.admin {
//           background: #007bff;
//           color: white;
//           align-self: flex-end;
//         }
//         .chat-input {
//           display: flex;
//           padding: 10px;
//           border-top: 1px solid #ccc;
//           background: #fff;
//         }
//         .chat-input input {
//           flex: 1;
//           padding: 10px;
//           border: 1px solid #ccc;
//           border-radius: 20px;
//           margin-right: 8px;
//           outline: none;
//         }
//         .chat-input button {
//           padding: 10px 18px;
//           background: #007bff;
//           color: white;
//           border: none;
//           border-radius: 20px;
//           cursor: pointer;
//           transition: background 0.2s;
//         }
//         .chat-input button:hover {
//           background: #0056b3;
//         }
//         @media (max-width: 768px) {
//           .chat-wrapper {
//             flex-direction: column;
//           }
//           .sidebar {
//             width: 100%;
//             border-right: none;
//             border-bottom: 1px solid #ddd;
//           }
//         }
//       `}</style>
//     </div>
//   );
// } 















// // src/pages/Messages.jsx
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

// export default function Messages() {
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return;

//     fetchConversations();
//   }, [token]);

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/conversations", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) {
//         setConversations(res.data.conversations);
//         if (res.data.conversations.length) {
//           setSelectedConversation(res.data.conversations[0]);
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching conversations:", err);
//     }
//   };

//   useEffect(() => {
//     if (!selectedConversation || !token) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/messages/order/${selectedConversation.orderId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           setMessages(res.data.messages);
//         }
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//       }
//     };

//     fetchMessages();
//   }, [selectedConversation, token]);

//   // const handleSend = async () => {
//   //   if (!newMessage.trim() || !selectedConversation) return;

//   //   try {
//   //     // Get the user ID to send message to (either buyer or seller)
//   //     const order = selectedConversation.order;
//   //     const receiverId = order.userId._id; // Send to buyer by default

//   //     const res = await axios.post("http://localhost:5000/api/messages", {
//   //       receiverId,
//   //       text: newMessage,
//   //       orderId: selectedConversation.orderId
//   //     }, {
//   //       headers: { Authorization: `Bearer ${token}` }
//   //     });

//   //     if (res.data.success) {
//   //       setMessages([...messages, res.data.message]);
//   //       setNewMessage("");
//   //       fetchConversations(); // Refresh conversations to update last message
//   //     }
//   //   } catch (err) {
//   //     console.error("Error sending message:", err);
//   //   }
//   // }; 

//   const handleSend = () => {
//     if (!newMessage.trim() || !selectedConversation) return;

//     const receiverId = selectedConversation.order.userId._id;

//     socket.emit("sendMessage", {
//       orderId: selectedConversation.orderId,
//       receiverId,
//       text: newMessage,
//     });

//     setNewMessage("");
//   };

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString();
//   };

//   return (
//     <div className="chat-wrapper">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h3>Conversations</h3>
//         <ul>
//           {conversations.map((conversation) => (
//             <li
//               key={conversation.orderId}
//               className={`conversation-item ${selectedConversation?.orderId === conversation.orderId ? "active" : ""}`}
//               onClick={() => setSelectedConversation(conversation)}
//             >
//               <div className="conversation-header">
//                 <strong>Order: {conversation.orderId.substring(0, 8)}...</strong>
//                 <span className="message-count">{conversation.messageCount} messages</span>
//               </div>
//               <div className="conversation-info">
//                 Customer: {conversation.order?.userId?.email || "Unknown"}
//               </div>
//               {conversation.lastMessage && (
//                 <div className="last-message">
//                   {conversation.lastMessage.text.substring(0, 50)}...
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Section */}
//       <div className="chat-container">
//         <div className="chat-header">
//           {selectedConversation ?
//             `Conversation for Order ${selectedConversation.orderId.substring(0, 8)}...` :
//             "Select a conversation to start chat"
//           }
//         </div>

//         <div className="chat-body">
//           {messages.length === 0 ? (
//             <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>No messages yet</p>
//           ) : (
//             messages.map((msg) => (
//               <div
//                 key={msg._id}
//                 className={`message ${msg.senderId.isAdmin ? "admin" : "user"}`}
//               >
//                 <div className="message-header">
//                   <strong>{msg.senderId.email}</strong>
//                   <span className="message-time">{formatDate(msg.createdAt)}</span>
//                 </div>
//                 <div className="message-text">{msg.text}</div>
//               </div>
//             ))
//           )}
//           <div ref={messagesEndRef}></div>
//         </div>

//         {selectedConversation && (
//           <div className="chat-input">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button onClick={handleSend}>Send</button>
//           </div>
//         )}
//       </div>

//       <style>{`
//         .chat-wrapper {
//           display: flex;
//           height: 90vh;
//           border: 1px solid #ccc;
//           border-radius: 8px;
//           overflow: hidden;
//           font-family: Arial, sans-serif;
//         }
//         .sidebar {
//           width: 300px;
//           background: #f8f9fa;
//           padding: 15px;
//           border-right: 1px solid #ddd;
//           overflow-y: auto;
//         }
//         .sidebar h3 {
//           margin-bottom: 15px;
//           font-size: 18px;
//           color: #130303ff;
//           border-bottom: 1px solid #ddd;
//           padding-bottom: 8px;
//         }
//         .sidebar ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }
//         .conversation-item {
//           padding: 12px;
//           margin-bottom: 10px;
//           background: #fff;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.2s;
//           border: 1px solid #eee;
//         }
//         .conversation-item:hover {
//           background: #e9f3ff;
//         }
//         .conversation-item.active {
//           background: #007bff;
//           color: white;
//           border: 1px solid #0056b3;
//         }
//         .conversation-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 8px;
//         }
//         .message-count {
//           font-size: 12px;
//           background: #6c757d;
//           color: white;
//           padding: 2px 6px;
//           border-radius: 10px;
//         }
//         .conversation-item.active .message-count {
//           background: #ffffff;
//           color: #007bff;
//         }
//         .conversation-info {
//           font-size: 14px;
//           margin-bottom: 8px;
//         }
//         .last-message {
//           font-size: 12px;
//           color: #666;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;
//         }
//         .conversation-item.active .last-message {
//           color: #f1f1f1;
//         }
//         .chat-container {
//         // border: 2px solid red;
//         margin-left: 330px;
//           display: flex;
//           flex-direction: column;
//           flex: 1;
//         }
//         .chat-header {
//           background: #007bff;
//           color: white;
//           padding: 12px;
//           font-weight: bold;
//           text-align: center;
//         }
//         .chat-body {
//           flex: 1;
//           padding: 20px;
//           overflow-y: auto;
//           background: #f9f9f9;
//         }
//         .message {
//           margin-bottom: 15px;
//           padding: 12px;
//           border-radius: 8px;
//           background: white;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
//         }
//         .message.admin {
//           border-left: 4px solid #007bff;
//         }
//         .message.user {
//           border-left: 4px solid #28a745;
//         }
//         .message-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 8px;
//           font-size: 14px;
//         }
//         .message-time {
//           color: #6c757d;
//           font-size: 12px;
//         }
//         .message-text {
//           font-size: 14px;
//           line-height: 1.4;
//         }
//         .chat-input {
//           display: flex;
//           padding: 15px;
//           border-top: 1px solid #ccc;
//           background: #fff;
//         }
//         .chat-input input {
//           flex: 1;
//           padding: 12px;
//           border: 1px solid #ccc;
//           border-radius: 6px;
//           margin-right: 10px;
//           outline: none;
//           font-size: 14px;
//         }
//         .chat-input button {
//           padding: 12px 20px;
//           background: #007bff;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: background 0.2s;
//           font-size: 14px;
//         }
//         .chat-input button:hover {
//           background: #0056b3;
//         }
//         @media (max-width: 768px) {
//           .chat-wrapper {
//             flex-direction: column;
//           }
//           .sidebar {
//             width: 100%;
//             border-right: none;
//             border-bottom: 1px solid #ddd;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }













// src/pages/Messages.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSocket } from "../context/SocketContext";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { socket } = useSocket();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetchConversations();
  }, [token]);

  useEffect(() => {
    if (socket && selectedConversation) {
      // Join the order room
      socket.emit("join-order-rooms", [selectedConversation.orderId]);
      
      // Listen for new messages
      socket.on("receive-message", (message) => {
        if (message.orderId === selectedConversation.orderId) {
          setMessages(prev => [...prev, message]);
        }
      });
      
      return () => {
        socket.off("receive-message");
      };
    }
  }, [socket, selectedConversation]);

  const fetchConversations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setConversations(res.data.conversations);
        if (res.data.conversations.length) {
          setSelectedConversation(res.data.conversations[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching conversations:", err);
    }
  };

  useEffect(() => {
    if (!selectedConversation || !token) return;
    
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/order/${selectedConversation.orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.data.success) {
          setMessages(res.data.messages);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    
    fetchMessages();
  }, [selectedConversation, token]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedConversation || !socket) return;

    try {
      // Get the user ID to send message to (either buyer or seller)
      const order = selectedConversation.order;
      const receiverId = order.userId._id; // Send to buyer by default
      
      // Send message via socket
      socket.emit("send-message", {
        receiverId,
        text: newMessage,
        orderId: selectedConversation.orderId
      });
      
      // Optimistically add message to UI
      const userData = JSON.parse(sessionStorage.getItem("user"));
      setMessages([...messages, {
        _id: Date.now(), // Temporary ID
        senderId: { _id: userData.id, email: userData.email },
        text: newMessage,
        createdAt: new Date()
      }]);
      setNewMessage("");
      fetchConversations(); // Refresh conversations to update last message
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="chat-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Conversations</h3>
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.orderId}
              className={`conversation-item ${selectedConversation?.orderId === conversation.orderId ? "active" : ""}`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="conversation-header">
                <strong>Order: {conversation.orderId.substring(0, 8)}...</strong>
                <span className="message-count">{conversation.messageCount} messages</span>
              </div>
              <div className="conversation-info">
                Customer: {conversation.order?.userId?.email || "Unknown"}
              </div>
              {conversation.lastMessage && (
                <div className="last-message">
                  {conversation.lastMessage.text.substring(0, 50)}...
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="chat-container">
        <div className="chat-header">
          {selectedConversation ? 
            `Conversation for Order ${selectedConversation.orderId.substring(0, 8)}...` : 
            "Select a conversation to start chat"
          }
        </div>

        <div className="chat-body">
          {messages.length === 0 ? (
            <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>No messages yet</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`message ${msg.senderId.isAdmin ? "admin" : "user"}`}
              >
                <div className="message-header">
                  <strong>{msg.senderId.email}</strong>
                  <span className="message-time">{formatDate(msg.createdAt)}</span>
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {selectedConversation && (
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        )}
      </div>

      <style>{`
        /* ... (existing styles remain the same) */
        .chat-wrapper {
          display: flex;
          height: 90vh;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          font-family: Arial, sans-serif;
        }
        .sidebar {
          width: 300px;
          background: #f8f9fa;
          padding: 15px;
          border-right: 1px solid #ddd;
          overflow-y: auto;
        }
        .sidebar h3 {
          margin-bottom: 15px;
          font-size: 18px;
          color: #130303ff;
          border-bottom: 1px solid #ddd;
          padding-bottom: 8px;
        }
        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .conversation-item {
          padding: 12px;
          margin-bottom: 10px;
          background: #fff;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid #eee;
        }
        .conversation-item:hover {
          background: #e9f3ff;
        }
        .conversation-item.active {
          background: #007bff;
          color: white;
          border: 1px solid #0056b3;
        }
        .conversation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .message-count {
          font-size: 12px;
          background: #6c757d;
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
        }
        .conversation-item.active .message-count {
          background: #ffffff;
          color: #007bff;
        }
        .conversation-info {
          font-size: 14px;
          margin-bottom: 8px;
        }
        .last-message {
          font-size: 12px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .conversation-item.active .last-message {
          color: #f1f1f1;
        }
        .chat-container {
        // border: 2px solid red;
        margin-left: 330px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .chat-header {
          background: #007bff;
          color: white;
          padding: 12px;
          font-weight: bold;
          text-align: center;
        }
        .chat-body {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: #f9f9f9;
        }
        .message {
          margin-bottom: 15px;
          padding: 12px;
          border-radius: 8px;
          background: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .message.admin {
          border-left: 4px solid #007bff;
        }
        .message.user {
          border-left: 4px solid #28a745;
        }
        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .message-time {
          color: #6c757d;
          font-size: 12px;
        }
        .message-text {
          font-size: 14px;
          line-height: 1.4;
        }
        .chat-input {
          display: flex;
          padding: 15px;
          border-top: 1px solid #ccc;
          background: #fff;
        }
        .chat-input input {
          flex: 1;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-right: 10px;
          outline: none;
          font-size: 14px;
        }
        .chat-input button {
          padding: 12px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
          font-size: 14px;
        }
        .chat-input button:hover {
          background: #0056b3;
        }
        @media (max-width: 768px) {
          .chat-wrapper {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #ddd;
          }
        }
      `}</style>
    </div>
  );
}

