import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import "../styles/sellerCenter.css";
import Sidebar from "../components/Sidebar";
import AdminDashboard from "./AdminDashboard";

export default function SellerCenter() {
  return (
    <>
      <div className="sellerCenter-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Page Content */}
      <main className="sellerCenter-main">
        <div style={{marginLeft: "20px"}}>
        <h1>Welcome to Seller Center</h1>
        <p>Manage your listings, sales, and product reviews.</p>
        </div>

        <div className="dashboard-wrapper">
          <AdminDashboard /> 
        </div>
      </main>
    </div>
    </>
  );
}
