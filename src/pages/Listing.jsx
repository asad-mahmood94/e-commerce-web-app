// // src/pages/Listing.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "../styles/listing.css"; 

// export default function Listing() {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Electronics",
//     productImage: null,
//   });

//   const [preview, setPreview] = useState(null);
//   const [products, setProducts] = useState([]); // ✅ store uploaded products
//   const navigate = useNavigate();
//   const { user, token } = useAuth();

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     if (!user.isAdmin) {
//       navigate("/");
//     } else {
//       fetchProducts();
//     }
//   }, [user, navigate]);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products");
//       setProducts(res.data.products || []);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "productImage") {
//       const file = files[0];
//       setFormData({ ...formData, productImage: file });
//       setPreview(file ? URL.createObjectURL(file) : null);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       alert("You must be logged in.");
//       return;
//     }

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (formData[key]) {
//         data.append(key, formData[key]);
//       }
//     });

//     try {
//       await axios.post("http://localhost:5000/api/products", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("✅ Product listed successfully!");
//       setFormData({
//         name: "",
//         description: "",
//         price: "",
//         category: "Electronics",
//         productImage: null,
//       });
//       setPreview(null);

//       fetchProducts(); // ✅ refresh product list
//     } catch (err) {
//       console.error(err);
//       if (err.response?.status === 403) {
//         alert("❌ You are not authorized to add products.");
//       } else {
//         alert("❌ Failed to list product");
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("🗑️ Product deleted successfully!");
//       fetchProducts(); // ✅ refresh after delete
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to delete product");
//     }
//   };

//   return (
//     <div className="listing-page">
//       <h2 style={{marginLeft: "0", }}>List a New Product</h2>
//       <form onSubmit={handleSubmit} className="listing-form">
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Product Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />

//         <select name="category" value={formData.category} onChange={handleChange}>
//           <option value="Electronics">Electronics</option>
//           <option value="Fashion">Fashion</option>
//           <option value="Home Decor">Home Decor</option>
//         </select>

//         <input
//           type="file"
//           name="productImage"
//           accept="image/*"
//           onChange={handleChange}
//         />

//         {preview && (
//           <img
//             src={preview}
//             alt="Preview"
//             width="150"
//             style={{ marginTop: "10px" }}
//           />
//         )}

//         <button type="submit">Submit</button>
//       </form>

//       {/* ✅ Uploaded Products List */}
//       <h2 style={{ marginTop: "30px", marginLeft: "0" }}>Uploaded Listings</h2>
//       <div className="uploaded-products">
//         {products.length > 0 ? (
//           products.map((p) => (
//             <div key={p._id} className="product-card">
//               <img
//                 src={`http://localhost:5000${p.productImage}`}
//                 alt={p.name}
//                 width="120"
//               />
//               <div>
//                 <h3>{p.name}</h3>
//                 <p>{p.description}</p>
//                 <p>${p.price}</p>
//                 <button
//                   onClick={() => handleDelete(p._id)}
//                   className="delete-btn"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products listed yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/listing.css";

export default function Listing() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Electronics",
        productImage: null,
    });

    const [preview, setPreview] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data.products || []);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (!user.isAdmin) {
            navigate("/");
        } else {
            fetchProducts();
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "productImage") {
            const file = files[0];
            setFormData({ ...formData, productImage: file });
            setPreview(file ? URL.createObjectURL(file) : null);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alert("You must be logged in.");
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) data.append(key, formData[key]);
        });

        try {
            await axios.post("http://localhost:5000/api/products", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("✅ Product listed successfully!");
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "Electronics",
                productImage: null,
            });
            setPreview(null);
            fetchProducts();
        } catch (err) {
            console.error(err);
            if (err.response?.status === 403) {
                alert("❌ You are not authorized to add products.");
            } else {
                alert("❌ Failed to list product");
            }
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("🗑️ Listing deleted successfully!");
            fetchProducts();
        } catch (err) {
            console.error("Delete error:", err);
            alert("❌ Failed to delete product");
        }
    };

    // ✅ Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <div className="listing-page">
            <div
            onClick={() => navigate("/")} 
            style={{fontSize: "1.8rem", backgroundColor: "#050708f8", color: "white", width: "400px", textAlign: "center", borderRadius: "15px", }}>
                <h1 style={{color: "#00c3ff"}}>Shop<span style={{color: "white"}}>Ease</span></h1>
            </div>
      
            <h2 style={{marginLeft: "0"}}>List a New Product</h2>
            <form onSubmit={handleSubmit} className="listing-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Popular products">Popular products</option>
                </select>

                <input
                    type="file"
                    name="productImage"
                    accept="image/*"
                    onChange={handleChange}
                />

                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        width="150"
                        style={{ marginTop: "10px", borderRadius: "10px" }}
                    />
                )}

                <button type="submit">Submit</button>
            </form>

            {/* ✅ Grouped Products by Category */}
            <div className="uploaded-products">
                <h2 style={{ marginLeft: "0" }}>Listed Products</h2>
                {Object.keys(groupedProducts).length > 0 ? (
                    Object.keys(groupedProducts).map((category) => (
                        <div key={category} className="category-section">
                            <h2 className="category-title" style={{ marginLeft: "0" }}>{category}</h2>
                            {groupedProducts[category].map((p) => (
                                <div key={p._id} className="product-list-card">
                                    <img
                                        src={p.productImage}
                                        alt={p.name}
                                    />
                                    <div className="product-details">
                                        <h3>{p.name}</h3>
                                        <p>{p.description}</p>
                                        <p className="price">💲{p.price}</p>
                                    </div>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(p._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                        No products listed yet.
                    </p>
                )}
            </div>
        </div>
    );
}