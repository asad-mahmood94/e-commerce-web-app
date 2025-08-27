// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   // ✅ Load from sessionStorage (not localStorage)
//   useEffect(() => {
//     const storedUser = sessionStorage.getItem("user");
//     const storedToken = sessionStorage.getItem("token");
//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }
//   }, []);

//   const login = (userData, jwtToken) => {
//     setUser(userData);
//     setToken(jwtToken);
//     sessionStorage.setItem("user", JSON.stringify(userData));
//     sessionStorage.setItem("token", jwtToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     sessionStorage.removeItem("user");
//     sessionStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);








// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(() => sessionStorage.getItem("token"));
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch user from backend if token exists
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!token) {
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data); // decoded user from backend
//       } catch (err) {
//         console.error("❌ Invalid or expired token:", err);
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [token]);

//   const login = (newToken) => {
//     sessionStorage.setItem("token", newToken);
//     setToken(newToken);
//   };

//   const logout = () => {
//     sessionStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);










// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // prevent flicker

  // ✅ Load token from sessionStorage and fetch user from backend
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Function to fetch user using token
  const fetchUser = async (jwtToken) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.error("❌ Error fetching user:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login function (save only token in storage)
  const login = (jwtToken) => {
    setToken(jwtToken);
    sessionStorage.setItem("token", jwtToken);
    fetchUser(jwtToken);
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);








// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(sessionStorage.getItem("token") || null);
//   const [loading, setLoading] = useState(true);

//   // 🔑 Verify token & fetch user from backend
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (token) {
//         try {
//           const res = await fetch("http://localhost:5000/api/auth/me", {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           const data = await res.json();
//           if (data.success) {
//             setUser(data.user);
//           } else {
//             logout();
//           }
//         } catch (err) {
//           console.error("Auth check failed:", err);
//           logout();
//         }
//       }
//       setLoading(false);
//     };
//     fetchUser();
//   }, [token]);

//   const login = (jwtToken) => {
//     setToken(jwtToken);
//     sessionStorage.setItem("token", jwtToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     sessionStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);