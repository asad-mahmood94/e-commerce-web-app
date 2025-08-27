import React from "react";
import "../styles/reviews.css";

export default function Reviews() {
  return (
    <section className="reviews">
      <h2>What Our Customers Say</h2>
      <div className="review-list">
        <div className="review-card">
          <p>"Amazing products and super fast delivery!"</p>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <span>- Sarah W.</span>
        </div>
        <div className="review-card">
          <p>"Great quality items at affordable prices."</p>
          <div className="stars">⭐⭐⭐⭐</div>
          <span>- James K.</span>
        </div>
        <div className="review-card">
          <p>"Customer service was very helpful!"</p>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <span>- Priya S.</span>
        </div>
        <div className="review-card">
          <p>"I love shopping here, so many choices!"</p>
          <div className="stars">⭐⭐⭐⭐</div>
          <span>- Alex M.</span>
        </div>
      </div>
    </section>
  );
}