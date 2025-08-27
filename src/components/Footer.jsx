import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>ShopEase</h3>
          <p>Your favorite store for everything tech and trendy.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>Email: support@shopease.com</p>
          <p>Phone: +1 800 123 4567</p>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">🐦</a>
            <a href="#">📸</a>
          </div>
        </div>
      </div>
      <p>&copy; 2025 ShopEase. All rights reserved.</p>
    </footer>
  );
}