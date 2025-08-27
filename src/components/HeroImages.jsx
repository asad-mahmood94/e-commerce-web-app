import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function HeroImages() {
  const { token } = useAuth();
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch images
  useEffect(() => {
    fetch("http://localhost:5000/api/hero-images")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setImages(data.images);
      });
  }, []);

  // Upload image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/hero-images", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setImages([data.image, ...images]);
      setFile(null);
    }
  };

  // Delete image
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    const res = await fetch(`http://localhost:5000/api/hero-images/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (data.success) {
      setImages(images.filter((img) => img.id !== id));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Hero Images</h2>

      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {images.map((img) => (
          <div key={img.id} style={{ marginBottom: "10px" }}>
            <img src={img.imageUrl} alt="Hero" width="200" />
            <button onClick={() => handleDelete(img.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}