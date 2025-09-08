// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "../styles/sidebar.css";

// export default function Sidebar({
//   links = [
//     { to: "/listing", label: "Listing" },
//     { to: "/orders", label: "Orders"},
//     { to: "/reviews", label: "Reviews" },
//     { to: "/performance", label: "Performance" },
//     { to: "/messages", label: "Messages"}
//   ],
// }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <aside className="sidebar">
//       {/* Logo */}
//       <div className="sidebar-logo" onClick={() => navigate("/")}>
//         Shop<span>Ease</span>
//       </div>

//       {/* Sidebar Links */}
//       <nav className="sidebar-links">
//         {links.map((link, idx) => (
//           <button
//             key={idx}
//             className="sidebar-btn"
//             onClick={() => navigate(link.to)}
//           >
//             {link.label}
//           </button>
//         ))}
//       </nav>

//       {/* Profile Section at Bottom */}
//       {user && (
//         <div className="sidebar-profile" onClick={() => navigate("/profile")}>
//           <img
//             src={user.profileImage || "/default-avatar.png"}
//             alt="Profile"
//             className="profile-avatar"
//           />
//           <span>{user.name || "Profile"}</span>
//         </div>
//       )}
//     </aside>
//   );
// }


















import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/sidebar.css";

export default function Sidebar({
  links = [
    { to: "/listing", label: "Listing" },
    { to: "/orders", label: "Orders" },
    { to: "/reviews", label: "Reviews" },
    { to: "/performance", label: "Performance" },
    { to: "/messages", label: "Messages" }
  ],
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => navigate("/")}>
        Shop<span>Ease</span>
      </div>

      {/* Sidebar Links */}
      <nav className="sidebar-links">
        {links.map((link, idx) => (
          <button
            key={idx}
            className="sidebar-btn"
            onClick={() => navigate(link.to)}
          >
            {link.label}
          </button>
        ))}

        {/* Show only for Admin */}
        {user?.isAdmin && (
          <button
            className="sidebar-btn admin-link"
            onClick={() => navigate("/hero-images")}
          >
            Hero Images
          </button>
        )}
      </nav>

      {/* Profile Section */}
      {user && (
        <div className="sidebar-profile" onClick={() => navigate("/profile")}>
          <img
            src={user.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="profile-avatar"
          />
          <span>{user.name || user.email}</span>
        </div>
      )}
    </aside>
  );
}






