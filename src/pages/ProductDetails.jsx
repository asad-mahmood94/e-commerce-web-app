// // src/components/ProductDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/products/${id}`)
//       .then((res) => setProduct(res.data.product))
//       .catch((err) => console.error("Error fetching product:", err));
//   }, [id]);

//   if (!product) {
//     return <p>Loading product details...</p>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//         <Header />
//       <h2>{product.name}</h2>
//       <img
//         src={`http://localhost:5000${product.productImage}`}
//         alt={product.name}
//         style={{ width: "300px", height: "300px", objectFit: "cover" }}
//       />
//       <p><strong>Price:</strong> ${product.price}</p>
//       <p>{product.description}</p>
//       <p><strong>Category:</strong> {product.category}</p>
//     </div>
//   );
// }





// // src/components/ProductDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";
// // import { useCart } from "../context/CartContext";


// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
  
//   // const { addToCart } = useCart();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/products/${id}`)
//       .then((res) => setProduct(res.data.product))
//       .catch((err) => console.error("Error fetching product:", err));
//   }, [id]);

//   // ✅ Handle Add to Cart
//   // const handleAddToCart = () => {
//   //   console.log("Added to cart:", product);
//   //   alert(`${product.name} added to cart!`);
//   // };
//   const handleAddToCart = async () => {
//     const token = sessionStorage.getItem("token");

//     if (!token) {
//       alert("First you have to login");
//       window.location.href = "/login";
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/cart", // ← was /api/cart/add
//         { productId: product._id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) {
//         alert("Product added to cart!");
//       } else {
//         alert(res.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("Error adding to cart:", err?.response?.data || err.message);
//       alert(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Header />
//       <h2>{product.name}</h2>
//       <img
//         src={`http://localhost:5000${product.productImage}`}
//         alt={product.name}
//         style={{ width: "300px", height: "300px", objectFit: "cover" }}
//       />
//       <p>
//         <strong>Price:</strong> ${product.price}
//       </p>
//       <p>{product.description}</p>
//       <p>
//         <strong>Category:</strong> {product.category}
//       </p>

//       {/* ✅ Add to Cart Button */}
//       <button
//         onClick={handleAddToCart}
//         style={{
//           marginTop: "15px",
//           padding: "10px 16px",
//           backgroundColor: "#28a745",
//           color: "white",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//           fontSize: "16px",
//         }}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }
















// src/components/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { useCart } from "../context/CartContext"; // ✅ to update cart count

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { fetchCart } = useCart(); // ✅ refresh cart count after adding

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  // ✅ Handle Add to Cart
  const handleAddToCart = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("First you have to login");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { productId: product._id, quantity: 1 },
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
    <div style={{ padding: "20px" }}>
      <Header />

      {!product ? (
        <p>Loading product...</p>
      ) : (
        <>
          <h2>{product.name}</h2>

          {product?.productImage && (
            <img
              src={`http://localhost:5000${product.productImage}`}
              alt={product.name}
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
              }}
            />
          )}

          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>{product.description}</p>
          {/* <p>
            <strong>Category:</strong> {product.category}
          </p> */}
          <p style={{ 
              backgroundColor: "#ecf0f1", 
              padding: "8px 12px",
              borderRadius: "20px",
              display: "inline-block",
              margin: "10px 0"
            }}>
              <strong>Category:</strong> {product.category}
            </p>

          {/* ✅ Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            style={{
              marginTop: "15px",
              padding: "10px 16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Add to Cart
          </button>
        </>
      )}
    </div>
  );
}


















// // src/components/ProductDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//         if (response.data.success) {
//           setProduct(response.data.product);
//         } else {
//           setError("Product not found");
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError("Failed to load product. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = async () => {
//     const token = sessionStorage.getItem("token");

//     if (!token) {
//       alert("Please login first to add items to your cart");
//       window.location.href = "/login";
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/cart",
//         { productId: product._id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) {
//         alert("Product added to cart!");
//       } else {
//         alert(res.data.message || "Failed to add product to cart");
//       }
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <Header />
//         <div style={{ marginTop: "20px" }}>
//           <div style={{
//             width: "50px",
//             height: "50px",
//             border: "5px solid #f3f3f3",
//             borderTop: "5px solid #3498db",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite",
//             margin: "0 auto"
//           }}></div>
//           <p>Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <Header />
//         <div style={{
//           backgroundColor: "#ffebee",
//           color: "#c62828",
//           padding: "20px",
//           borderRadius: "8px",
//           marginTop: "20px"
//         }}>
//           <h3>Error</h3>
//           <p>{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#c62828",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               marginTop: "10px"
//             }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <Header />
//         <div style={{
//           padding: "40px",
//           backgroundColor: "#f5f5f5",
//           borderRadius: "8px",
//           marginTop: "20px"
//         }}>
//           <h3>Product Not Found</h3>
//           <p>The product you're looking for doesn't exist.</p>
//           <button 
//             onClick={() => window.history.back()}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#2196f3",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               marginTop: "10px"
//             }}
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
//       <Header />
//       <div style={{ 
//         display: "flex", 
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "20px",
//         marginTop: "20px"
//       }}>
//         <h2 style={{ color: "#2c3e50", margin: 0 }}>{product.name}</h2>
//         <div style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "15px",
//           backgroundColor: "white",
//           padding: "25px",
//           borderRadius: "12px",
//           boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//           width: "100%",
//           maxWidth: "600px"
//         }}>
//           <img
//             src={`http://localhost:5000${product.productImage}`}
//             alt={product.name}
//             style={{ 
//               width: "100%", 
//               maxWidth: "400px",
//               height: "300px", 
//               objectFit: "cover",
//               borderRadius: "8px"
//             }}
//           />
//           <div style={{ width: "100%", textAlign: "left" }}>
//             <p style={{ fontSize: "1.5rem", color: "#e74c3c", fontWeight: "bold", margin: "10px 0" }}>
//               <strong>Price:</strong> ${product.price}
//             </p>
//             <p style={{ lineHeight: "1.6", margin: "10px 0" }}>
//               {product.description}
//             </p>
//             <p style={{ 
//               backgroundColor: "#ecf0f1", 
//               padding: "8px 12px",
//               borderRadius: "20px",
//               display: "inline-block",
//               margin: "10px 0"
//             }}>
//               <strong>Category:</strong> {product.category}
//             </p>
//           </div>

//           <button
//             onClick={handleAddToCart}
//             style={{
//               marginTop: "15px",
//               padding: "12px 24px",
//               backgroundColor: "#27ae60",
//               color: "white",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontSize: "16px",
//               fontWeight: "bold",
//               transition: "background-color 0.3s",
//               width: "100%"
//             }}
//             onMouseOver={(e) => e.target.style.backgroundColor = "#219653"}
//             onMouseOut={(e) => e.target.style.backgroundColor = "#27ae60"}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
      
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </div>
//   );
// }