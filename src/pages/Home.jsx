import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/PopularProducts";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import "../styles/home.css";
import PopularProducts from "../components/PopularProducts";

export default function Home() {
  return (
    <>
    <div className="whole">
      <Header />
      <br></br>
      <Hero className="hero"/>
      <Categories />
      <PopularProducts />
      <Reviews />
      <Footer />

    </div>
    </>
  );
}