import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import "../styles/home.css";

export default function Home() {
  return (
    <>
    <div className="whole">
      <Header />
      <Hero />
      <Categories />
      <Products />

    </div>
    </>
  );
}