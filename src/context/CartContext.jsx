import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const token = sessionStorage.getItem("token");

  const fetchCart = async () => {
    if (!token) return;
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

  // load cart when app starts
  useEffect(() => {
    fetchCart();
  }, [token]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);








