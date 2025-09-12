//  src/components/Header.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/header.css";

// export default function Header() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <header className="navbar">
//       <Link to="/" className="logo">
//         Shop<span>Ease</span>
//       </Link>

//       <ul className="navitems">
//         <li><Link to="/" className="btn nav-btn">Home</Link></li>
//         <li><a href="#" className="btn nav-btn">Products</a></li>
//         <li><a href="#" className="btn nav-btn">About</a></li>
//         <li><a href="#" className="btn nav-btn">Contact</a></li>
//       </ul>

//       <div className="search-bar">
//         <input type="text" placeholder="Search products..." />
//         <button className="search-btn">🔍</button>
//       </div>

//       <div className="auth-buttons">
//         {user ? (
//           <div className="user-info">
//             <Link to="/profile">
//               <img
//                 src={user.profileImage || "/default-avatar.png"}
//                 alt="User Avatar"
//                 className="profile-avatar"
//               />
//             </Link>
//           </div>
//         ) : (
//           <>
//             <Link to="/login" className="btn login-btn">Login</Link>
//             <Link to="/signup" className="btn signup-btn">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/header.css";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// // If you want a proper cart icon, uncomment the line below after installing react-icons
// // import { FaShoppingCart } from "react-icons/fa";

// export default function Header({
//   links = [
//     { to: "/", label: "Home" },
//     { to: "#", label: "Products" },
//     { to: "#", label: "About" },
//     { to: "#", label: "Contact" },
//   ],
//   showSearch = true,
//   showAuthButtons = true,
// }) {
//   const { user } = useAuth();
//   const { cartCount } = useCart();
//   const navigate = useNavigate();

//   return (
//     <header className="navbar">
//       <Link to="/" className="logo" style={{ display: "flex", alignItems: "center" }}>
//         <img
//           src="/orange.png"
//           alt="ShopEase Logo"
//           style={{
//             height: "150px",   // ✅ adjust size
//             width: "auto",    // ✅ keep aspect ratio
//             objectFit: "contain",
//           }}
//         />
//       </Link>

//       {/* Dynamic nav items */}
//       <ul className="navitems">
//         {links.map((link, idx) => (
//           <li key={idx}>
//             <Link to={link.to} className="btn nav-btn">
//               {link.label}
//             </Link>
//           </li>
//         ))}

//         {/* Admin-only link */}
//         {user?.isAdmin && (
//           <li>
//             <Link to="/sellerCenter" className="btn nav-btn">
//               Admin Panels
//             </Link>
//           </li>
//         )}
//       </ul>

//       {/* Search Bar */}
//       {showSearch && (
//         <div className="search-bar">
//           <input type="text" placeholder="Search products..." />
//           <button className="search-btn">🔍</button>
//         </div>
//       )}
//       {/* 🛒 Cart Icon with count */}
//       <div
//         className="cart-icon"
//         onClick={() => navigate("/cart")}
//         style={{ position: "relative", cursor: "pointer", marginLeft: "15px", fontSize: "1.5rem" }}
//       >
//         🛒
//         {cartCount > 0 && (
//           <span
//             style={{
//               position: "absolute",
//               top: "-5px",
//               right: "-10px",
//               background: "red",
//               color: "white",
//               borderRadius: "50%",
//               padding: "2px 6px",
//               fontSize: "12px",
//             }}
//           >
//             {cartCount}
//           </span>
//         )}
//       </div>






//       {/* 🛒 Cart Icon
//       <div
//         className="cart-icon"
//         onClick={() => navigate("/cart")}
//         style={{ cursor: "pointer", marginLeft: "15px", fontSize: "1.5rem" }}
//       >
//         🛒 
//       </div> */}
//       {/* If using react-icons, replace with: <FaShoppingCart size={22} /> */}

//       {/* Auth buttons or profile */}
//       {showAuthButtons && (
//         <div className="auth-buttons">
//           {user ? (
//             <div className="user-info">
//               <img
//                 src={user.profileImage || "/default-avatar.png"}
//                 alt="User Avatar"
//                 className="profile-avatar cursor-pointer"
//                 onClick={() => navigate("/profile")}
//               />
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className="btn login-btn">
//                 Login
//               </Link>
//               <Link to="/signup" className="btn signup-btn">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }









// // src/components/Header.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/header.css";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";

// export default function Header({
//   links = [
//     { to: "/", label: "Home" },
//     { to: "#", label: "Products" },
//     { to: "#", label: "About" },
//     { to: "#", label: "Contact" },
//   ],
//   showSearch = true,
//   showAuthButtons = true,
// }) {
//   const { user, logout } = useAuth();
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   return (
//     <header className="navbar">
//       {/* Logo */}
//       <Link to="/" className="logo">
//         <img 
//           src="/orange.png" 
//           alt="Company Logo" 
//           className="logo-image"
//           style={{height: "150px"}}
//         />
//       </Link>

//       {/* Dynamic nav items */}
//       <ul className="navitems">
//         {links.map((link, idx) => (
//           <li key={idx}>
//             <Link to={link.to} className="btn nav-btn">
//               {link.label}
//             </Link>
//           </li>
//         ))}

//         {/* Admin-only link */}
//         {user?.isAdmin && (
//           <li>
//             <Link to="/sellerCenter" className="btn nav-btn">
//               Admin Panel
//             </Link>
//           </li>
//         )}
//       </ul>

//       {/* Search Bar */}
//       {showSearch && (
//         <div className="search-bar">
//           <input type="text" placeholder="Search products..." />
//           <button className="search-btn">🔍</button>
//         </div>
//       )}

//       {/* 🛒 Cart Icon */}
//       <div
//         className="cart-icon"
//         onClick={() => navigate("/cart")}
//         style={{ cursor: "pointer", marginLeft: "15px", fontSize: "1.5rem", position: "relative" }}
//       >
//         🛒
//         {cartItems.length > 0 && (
//           <span
//             style={{
//               position: "absolute",
//               top: "-5px",
//               right: "-10px",
//               background: "green",
//               color: "white",
//               borderRadius: "50%",
//               padding: "2px 6px",
//               fontSize: "12px",
//             }}
//           >
//             {cartItems.length}
//           </span>
//         )}
//       </div>

//       {/* Auth buttons or profile */}
//       {showAuthButtons && (
//         <div className="auth-buttons">
//           {user ? (
//             <div className="user-info flex items-center gap-2">
//               <img
//                 src={user.profileImage || "/default-avatar.png"}
//                 alt="User Avatar"
//                 className="profile-avatar cursor-pointer"
//                 onClick={() => navigate("/profile")}
//               />
//               {/* <button
//                 onClick={() => {
//                   logout();
//                   navigate("/login");
//                 }}
//                 className="btn logout-btn"
//               >
//                 Logout
//               </button> */}
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className="btn login-btn">
//                 Login
//               </Link>
//               <Link to="/signup" className="btn signup-btn">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }















import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header({
  links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "#", label: "Contact" },
    { to: "/assistant", label: "Assistant" }
  ],
  showSearch = true,
  showAuthButtons = true,
}) {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // 🔍 Fetch products while typing
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        // const res = await fetch(`/api/products/search/${searchTerm}`);
        const res = await fetch(`http://localhost:5000/api/products/search/${searchTerm}`);
        const data = await res.json();
        if (data.success) setSearchResults(data.products);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 100); // debounce
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleProductClick = (id, category) => {
    setSearchResults([]);
    setSearchTerm("");
    navigate(`/product/${id}`);
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        <img src="/orange.png" alt="Company Logo" className="logo-image" style={{ height: "150px" }} />
      </Link>

      {/* Dynamic nav items */}
      <ul className="navitems">
        {links.map((link, idx) => (
          <li key={idx}>
            {link.external ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="btn nav-btn"
              >
                {link.label}
              </a>
            ) : (
              <Link to={link.to} className="btn nav-btn">
                {link.label}
              </Link>
            )}
          </li>
        ))}
        {user?.isAdmin && (
          <li>
            <Link to="/sellerCenter" className="btn nav-btn">Admin Panel</Link>
          </li>
        )}
      </ul>



      {/* <ul className="navitems">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link to={link.to} className="btn nav-btn">
              {link.label}
            </Link>
          </li>
        ))}
        {user?.isAdmin && (
          <li>
            <Link to="/sellerCenter" className="btn nav-btn">Admin Panel</Link>
          </li>
        )}
      </ul> */}

      {/* 🔍 Search Bar */}
      {showSearch && (
        <div className="search-bar-container" style={{ position: "relative" }}>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>

          {/* Search results dropdown */}
          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((product) => (
                <li
                  key={product._id}
                  onClick={() => handleProductClick(product._id, product.category)}
                  className="search-item"
                >
                  <img
                    src={product.productImage || "/placeholder.png"}
                    alt={product.name}
                    style={{ width: "40px", height: "40px", marginRight: "10px" }}
                  />
                  <span>{product.name} – {product.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 🛒 Cart Icon */}
      <div className="cart-icon" onClick={() => navigate("/cart")} style={{ cursor: "pointer", marginLeft: "15px", fontSize: "1.5rem", position: "relative" }}>
        🛒
        {cartItems.length > 0 && (
          <span style={{
            position: "absolute",
            top: "-5px",
            right: "-10px",
            background: "green",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
          }}>
            {cartItems.length}
          </span>
        )}
      </div>

      {/* Auth buttons */}
      {showAuthButtons && (
        <div className="auth-buttons">
          {user ? (
            <div className="user-info flex items-center gap-2">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt="User Avatar"
                className="profile-avatar cursor-pointer"
                onClick={() => navigate("/profile")}
              />
            </div>
          ) : (
            <>
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/signup" className="btn signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
