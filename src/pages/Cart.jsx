// src/components/Cart.jsx
// src/components/Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const fetchCart = () => {
    axios
      .get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setCartItems(res.data.cart);
        }
      })
      .catch((err) => console.error("Error fetching cart:", err));
  };

  useEffect(() => {
    if (!token) {
      alert("First you have to login");
      navigate("/login");
      return;
    }
    fetchCart();
  }, [navigate]);

  const increaseQty = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  const decreaseQty = async (item) => {
    if (item.quantity > 1) {
      try {
        await axios.post(
          "http://localhost:5000/api/cart",
          { productId: item.product.id, quantity: -1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchCart();
      } catch (err) {
        console.error("Error decreasing quantity:", err);
      }
    } else {
      removeItem(item.product.id);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Header />
        <h2>Your Cart is Empty</h2>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <Header />
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "15px",
            padding: "15px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={item.product.productImage}
              alt={item.product.name}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "6px",
                marginRight: "15px",
              }}
            />
            <div>
              <h3>{item.product.name}</h3>
              <p>Price: ${item.product.price}</p>
              <p>Subtotal: ${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => decreaseQty(item)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                background: "#ccc",
              }}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => increaseQty(item.product.id)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                background: "#28a745",
                color: "white",
              }}
            >
              +
            </button>
            <button
              onClick={() => removeItem(item.product.id)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                background: "#dc3545",
                color: "white",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>

      {/* ✅ Proceed Button */}
      <button
        onClick={() => navigate("/checkout")}
        style={{
          marginTop: "20px",
          padding: "12px 18px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
