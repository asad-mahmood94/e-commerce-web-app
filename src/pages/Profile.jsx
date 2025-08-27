import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/profile.css";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="whole">
      <Header />
      <div className="profile-card">
        <img
          src={user.profileImage || "/default-avatar.png"}
          alt="Profile"
          className="profile"
        />
        <h3 className="user">{user.email.split("@")[0]}</h3>
        <p>Email: {user.email}</p>
        <Link to="/order-history" className="order-history-link">
          View Order History
        </Link>
        <br></br>
        <br></br>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}