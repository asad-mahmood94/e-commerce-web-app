// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/categoryProducts.css"; // ✅ reuse same CSS
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { fetchCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        let allProducts = res.data.products || [];

        // ✅ shuffle products randomly
        allProducts = allProducts.sort(() => 0.5 - Math.random());

        setProducts(allProducts);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleAddToCart = async (productId) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("First you have to login");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Product added to cart!");
        fetchCart();
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error adding to cart:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="page">
      <div style={{ width: "100%" }}>
        <Header className="new-header" />
      </div>
      <div style={{ width: "100%" }}>
        <h2>All Products</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/productDetails/${product._id}`)}
                >
                  <img
                    src={`http://localhost:5000${product.productImage}`}
                    alt={product.name}
                    className="img"
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>
                    <b>Category:</b> {product.category}
                  </p>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
