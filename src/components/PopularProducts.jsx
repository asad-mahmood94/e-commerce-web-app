// import React from "react";
// import "../styles/products.css";

// export default function Products() {
//   return (
//     <section className="products">
//       <h2>Popular Products</h2>
//       <div className="product-grid">
//         <div className="product-card">
//           <img src="https://via.placeholder.com/200" alt="Smart Watch" />
//           <h3>Smart Watch</h3>
//           <p>$99.99</p>
//           <button>Add to Cart</button>
//         </div>
//         <div className="product-card">
//           <img src="https://via.placeholder.com/200" alt="Wireless Earbuds" />
//           <h3>Wireless Earbuds</h3>
//           <p>$59.99</p>
//           <button>Add to Cart</button>
//         </div>
//         <div className="product-card">
//           <img src="https://via.placeholder.com/200" alt="LED Desk Lamp" />
//           <h3>LED Desk Lamp</h3>
//           <p>$24.99</p>
//           <button>Add to Cart</button>
//         </div>
//       </div>
//     </section>
//   );
// }












// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useCart } from "../context/CartContext";

// function ProductCard({ image, name, description, onClick}) {
  
//   return (
//     <div className="product-card" style={{ cursor: "pointer", backgroundColor: "#001524", padding: "50px" }}>
//       <img src={image} alt={name} className="img" style={{ height: "300px", width: "300px"}} />
//       <h3>{name}</h3>
//       <p>{description}</p>
//       <button onClick={onClick}>
//         Add to cart
//         </button>
//     </div>
//   );
// }




// const PopularProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//    const { fetchCart } = useCart();

//    const handleCardClick = () => {
//     navigate(`/product/${id}`); // 👈 navigate to product details page
//   };

//   useEffect(() => {
//     const fetchPopularProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/products/popular");
//         if (res.data.success) {
//           setProducts(res.data.products);
//         }
//       } catch (error) {
//         console.error("Error fetching popular products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPopularProducts();
//     // fetchCart();
//   }, []);
// // const fetchPopularProducts = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5000/api/products/popular");
// //         if (res.data.success) {
// //           setProducts(res.data.products);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching popular products:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPopularProducts();






//   const handleAddToCart = async (productId) => {
//   const token = sessionStorage.getItem("token");

//   if (!token) {
//     alert("First you have to login");
//     navigate("/login");
//     return;
//   }

//   try {
//     const res = await axios.post(
//       "http://localhost:5000/api/cart", // ← was /api/cart/add
//       { productId, quantity: 1 },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     if (res.data.success) {
//       alert("Product added to cart!");
//       fetchCart(); // ✅ refresh cart count in header
//     } else {
//       alert(res.data.message || "Something went wrong");
//     }
//   } catch (err) {
//     console.error("Error adding to cart:", err?.response?.data || err.message);
//     alert(err?.response?.data?.message || "Something went wrong");
//   }
// };


//   if (loading) return <p>Loading popular products...</p>;

//   return (
//     <div className="popular-products" st>
//       <h2>🔥 Popular Products</h2>
//       <div className="product-grid">
//         {products.map((product, index) => ( 
//           <ProductCard
//             key={index}
//             image={product.productImage}
//             name={product.name}
//             description={product.description}
//             onClick={() => handleAddToCart(product._id)}
//           />
//         ))}
//       </div>

//       {/* Simple CSS */}
//       <style jsx>{`
//         .popular-products {
//           // padding: 40px;
//         }
//         .grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//           gap: 20px;
//         }
//         .product-card {
//           // border: 1px solid #d31515ff;
//           border-radius: 10px;
//           padding: 10px;
//           text-align: center;
//           transition: 0.3s;
//         }
//         .product-card:hover {
//           transform: scale(1.05);
//         }
//         .product-image {
//           width: 100%;
//           height: 180px;
//           object-fit: cover;
//           border-radius: 8px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PopularProducts;













import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function ProductCard({ id, image, name, description, onAddToCart, price }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/productDetails/${id}`); // 👈 navigate to product details page
  };

  return (
    <div
      className="product-card"
      style={{ cursor: "pointer", backgroundColor: "#e34a35", padding: "50px" }}
      onClick={handleCardClick} // 👈 navigate when card is clicked
    >
      <img
        src={image}
        alt={name}
        className="img"
        style={{ height: "300px", width: "300px" }}
      />
      <h3>{name}</h3>
      <p>{description}</p>
      <h3>Price: ${price}</h3>
      {/* stop propagation so button doesn’t trigger card click */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart();
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { fetchCart } = useCart();

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/popular");
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error("Error fetching popular products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("First you have to login");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Product added to cart!");
        fetchCart();
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error adding to cart:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <p>Loading popular products...</p>;

  return (
    <div className="popular-products" style={{backgroundColor: "white"}}>
      <h2>🔥 Popular Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.productImage}
            name={product.name}
            description={product.description}
            price={product.price}
            onAddToCart={() => handleAddToCart(product._id)}
          />
        ))}
      </div>

      {/* Simple CSS */}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }
        .product-card {
          border-radius: 10px;
          padding: 10px;
          text-align: center;
          transition: 0.3s;
        }
        .product-card:hover {
          transform: scale(1.05);
        }
        .product-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default PopularProducts;

