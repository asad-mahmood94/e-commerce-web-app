import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/categories.css";

function ProductCard({ image, title, description, onClick }) {
  
  return (
    <div className="product-card" onClick={onClick} style={{ cursor: "pointer", backgroundColor: "#001524", padding: "50px" }}>
      <img src={image} alt={title} className="img" style={{ height: "300px", width: "300px"}} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Shop Now</button>
    </div>
  );
}

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      image: "src/electronics.jpg",
      title: "Electronics",
      description: "Discover gadgets, smart devices, and more."
    },
    {
      image: "src/fash1.jpg",
      title: "Fashion",
      description: "Stylish wear for every season and trend."
    },
    {
      image: "src/decor1.jpg",
      title: "Home Decor",
      description: "Beautify your space with modern designs."
    }
  ];

  const formatForUrl = (title) =>
    title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="page">
      <h2>Explore Our Categories</h2>
      <div className="product-grid">
        {categories.map((cat, index) => (
          <ProductCard
            key={index}
            image={cat.image}
            title={cat.title}
            description={cat.description}
            onClick={() => navigate(`/category/${formatForUrl(cat.title)}`)}
          />
        ))}
      </div>
    </div>
  );
}

















// quick test inside Categories.jsx
// import React, { useState } from "react";
// export default function TestCard() {
//   const [h, setH] = useState(false);
//   return (
//     <div
//       className="product-card"
//       onMouseEnter={()=>setH(true)}
//       onMouseLeave={()=>setH(false)}
//       style={{
//         display: "inline-block",
//         transform: h ? "translateY(-5px)" : "translateY(0)",
//         transition: "transform 0.18s ease",
//         padding: 20,
//         background: "white"
//       }}
//     >
//       Hover me
//     </div>
//   );
// }