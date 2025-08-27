import React from "react";
import "../styles/products.css";

export default function Products() {
  return (
    <section className="products">
      <h2>Popular Products</h2>
      <div className="product-grid">
        <div className="product-card">
          <img src="https://via.placeholder.com/200" alt="Smart Watch" />
          <h3>Smart Watch</h3>
          <p>$99.99</p>
          <button>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://via.placeholder.com/200" alt="Wireless Earbuds" />
          <h3>Wireless Earbuds</h3>
          <p>$59.99</p>
          <button>Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://via.placeholder.com/200" alt="LED Desk Lamp" />
          <h3>LED Desk Lamp</h3>
          <p>$24.99</p>
          <button>Add to Cart</button>
        </div>
      </div>
    </section>
  );
}