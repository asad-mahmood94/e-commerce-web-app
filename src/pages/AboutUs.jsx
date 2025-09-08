// src/pages/AboutUs.jsx
import React from "react";
import "../styles/AboutUs.css";
import Header from "../components/Header";

const AboutUs = () => {
  return (
    <div className="about-container">
        <Header/>
      {/* Hero Section */}
      <section className="hero" >
        <h1>About Us</h1>
        <p>
          Welcome to <span className="brand">ShopEase</span>, your one-stop
          destination for quality products and a seamless shopping experience.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="box">
          <h2>Our Mission</h2>
          <p>
            To make online shopping effortless, affordable, and enjoyable by
            providing top-quality products with unmatched customer service.
          </p>
        </div>
        <div className="box">
          <h2>Our Vision</h2>
          <p>
            To be the most trusted e-commerce brand worldwide, empowering
            millions of customers with choice, convenience, and reliability.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <h2>Why Choose Us?</h2>
        <div className="cards">
          <div className="card">
            <h3>Quality Products</h3>
            <p>We handpick products to ensure the highest quality standards.</p>
          </div>
          <div className="card">
            <h3>Fast Delivery</h3>
            <p>Swift and reliable delivery to your doorstep every time.</p>
          </div>
          <div className="card">
            <h3>Customer Support</h3>
            <p>Friendly 24/7 support to assist you whenever you need.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="member">
            <img src="https://via.placeholder.com/150" alt="Founder" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="member">
            <img src="https://via.placeholder.com/150" alt="CTO" />
            <h3>Jane Smith</h3>
            <p>Chief Technology Officer</p>
          </div>
          <div className="member">
            <img src="https://via.placeholder.com/150" alt="Manager" />
            <h3>Alex Johnson</h3>
            <p>Operations Manager</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="cta">
        <h2>Join Our Journey</h2>
        <p>Experience shopping like never before with ShopEase.</p>
        <link></link>
        <button>Start Shopping</button>
      </section>
    </div>
  );
};

export default AboutUs;
