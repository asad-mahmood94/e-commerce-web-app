import React, { useState } from "react";
import axios from "axios";
import "../styles/signup.css";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");

  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await axios.post(
        "http://localhost:5000/api/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        login(res.data.user, res.data.token); // ✅ context handles sessionStorage
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setMessage(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("Error during signup");
    }
  };

  return (
    <div className="whole">
      <Header />
      <div className="signup-container">
        <h2>Sign Up</h2>
        {message && <p className="signup-message">{message}</p>}

        <form onSubmit={handleSignup} className="signup-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Profile Image:</label>
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;