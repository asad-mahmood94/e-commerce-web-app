// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({ fullName: "", address: "", phone: "" });
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setCartItems(res.data.cart);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    if (!token) {
      alert("First you have to login");
      navigate("/login");
      return;
    }
    fetchCart();
  }, [navigate]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Order placed successfully!");
        navigate("/"); // go to home or orders page
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <Header />
      <h2>Checkout</h2>

      {/* Cart Summary */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            <p>
              {item.product.name} × {item.quantity} = $
              {(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}

