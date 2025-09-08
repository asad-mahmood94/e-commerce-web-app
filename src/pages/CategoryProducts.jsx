// // src/components/CategoryProducts.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";
// import "../styles/categoryProducts.css"; // ✅ new CSS file

// export default function CategoryProducts() {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);

//   const categoryName = category.replace(/-/g, " ");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/products/category/${categoryName}`)
//       .then((res) => {
//         setProducts(res.data.products || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//       });
//   }, [categoryName]);

//   return (
//     <div className="page">
//         <header >
//           <Header />
//         </header>
//       <h2>Products in {categoryName}</h2>
//       <div className="product-grid">
//         {products.length > 0 ? (
//           products.map((p) => (
//             <div
//               key={p._id}
//               className="product-card"
//               style={{ cursor: "pointer" }}
//               onClick={() => navigate(`/product/${p._id}`)}
//             >
//               <img
//                 src={`http://localhost:5000${p.productImage}`}
//                 alt={p.name}
//                 className="img"
//               />
//               <h3>{p.name}</h3>
//               <p>{p.description}</p>
//               <p>Price: ${p.price}</p>
//             </div>
//           ))
//         ) : (
//           <p>No products found in this category.</p>
//         )}
//       </div>
//     </div>
//   );
// }





// src/components/CategoryProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/categoryProducts.css"; // ✅ new CSS file
import { useCart } from "../context/CartContext";

export default function CategoryProducts() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { fetchCart } = useCart();

  const categoryName = category.replace(/-/g, " ");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/category/${categoryName}`)
      .then((res) => {
        setProducts(res.data.products || []);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [categoryName]);

  // ✅ Handle add to cart
  // const handleAddToCart = (product) => {
  //   // For now, just log (later you can connect to backend or context)
  //   console.log("Added to cart:", product);
  //   alert(`${product.name} added to cart!`);
  // };
  // ✅ Handle add to cart
  const handleAddToCart = async (productId) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    alert("First you have to login");
    navigate("/login");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/cart", // ← was /api/cart/add
      { productId, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      alert("Product added to cart!");
      fetchCart(); // ✅ refresh cart count in header
    } else {
      alert(res.data.message || "Something went wrong");
    }
  } catch (err) {
    console.error("Error adding to cart:", err?.response?.data || err.message);
    alert(err?.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="page">
      <div style={{ width: "100%" }}>
        <Header className="new-header" />
      </div>
      <div style={{ width: "100%" }}>
        <h2>Products in {categoryName}</h2>
        <div className="product-grid" >
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p._id} className="product-card">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/productDetails/${p._id}`)}
                >
                  <img
                    src={`http://localhost:5000${p.productImage}`}
                    alt={p.name}
                    className="img"
                  />
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <p>Price: ${p.price}</p>
                </div>
                {/* ✅ Add to Cart Button */}
                <button
                  className="add-to-cart-btn"
                // onClick={() => addToCart(p)}
                onClick={() => handleAddToCart(p._id)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}