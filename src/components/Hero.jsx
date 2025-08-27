// Hero.jsx
import React, { useEffect, useState } from "react";
import "../styles/hero.css";

export default function Hero() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right"); // "left" or "right"

  // Fetch hero images from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/hero-images");
        const data = await res.json();
        if (data.success) setImages(data.images);
      } catch (err) {
        console.error("Error fetching hero images:", err);
      }
    };
    fetchImages();
  }, []);

  const nextImage = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        nextImage();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  if (images.length === 0) {
    return (
      <section className="hero">
        <h1>Welcome to ShopEase</h1>
        <p>Your one-stop shop for everything you love!</p>
      </section>
    );
  }

  return (
    <section className="hero-container">
      <div className={`hero-slide ${direction}`}>
        <img
          src={images[currentIndex].imageUrl}
          alt="hero"
          className="hero-image"
        />

        {/* Overlay text */}
        {/* <div className="hero-overlay">
          <h1>Welcome to ShopEase</h1>
          <p>Your one-stop shop for everything you love!</p>
        </div> */}

        {/* Navigation Buttons (appear on hover) */}
        <button className="hero-btn left" onClick={prevImage}>
          ❮
        </button>
        <button className="hero-btn right" onClick={nextImage}>
          ❯
        </button>
      </div>
    </section>
  );
}