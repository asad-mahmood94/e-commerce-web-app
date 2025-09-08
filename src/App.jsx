// // src/App.jsx
// import { BrowserRouter, Routes, Route, } from "react-router-dom";
// import { useEffect } from "react";
// import { useAuth } from './context/AuthContext.jsx'
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Profile from "./pages/Profile";
// import SellerCenter from "./pages/SellerCenter.jsx";
// import Categories from "./components/Categories";
// import CategoryProducts from "./pages/CategoryProducts";
// import ProductDetails from "./pages/ProductDetails";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import Listing from "./pages/Listing.jsx";
// import HeroImages from "./components/HeroImages.jsx";

// export default function App() {
//   const { user } = useAuth(); // ✅ context check

//   // ✅ Ensures that user stays logged in after refresh
//   useEffect(() => {
//     if (user) {
//       console.log("User restored from session:", user);
//     }
//   }, [user]);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route index="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/profile" element={<Profile />} />
//         {/* <Route path="/sellerCenter" element={<SellerCenter />} />  */}
//         <Route path="/" element={<Categories />} />
//         <Route path="/category/:category" element={<CategoryProducts />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/listing" element={<Listing />} />
//         <Route path="/hero-images" element={<HeroImages />} />
//           {/* Admin-only route */}
//         <Route
//           path="/sellerCenter"
//           element={
//             <ProtectedRoute adminOnly={true}>
//               <SellerCenter />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }




// // src/App.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Profile from "./pages/Profile";
// import SellerCenter from "./pages/SellerCenter.jsx";
// import Categories from "./components/Categories";
// import CategoryProducts from "./pages/CategoryProducts";
// import ProductDetails from "./pages/ProductDetails";
// import Listing from "./pages/Listing.jsx";
// import HeroImages from "./components/HeroImages.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";

// export default function App() {
//   return (
//     <BrowserRouter>
//       {/* ✅ Global Header shown on all pages */}
//       <Header />

//       <Routes>
//         <Route index element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         {/* ✅ Admin-only route */}
//         <Route
//           path="/sellerCenter"
//           element={
//             <ProtectedRoute adminOnly={true}>
//               <SellerCenter />
//             </ProtectedRoute>
//           }
//         />

//         {/* ✅ Other routes */}
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/category/:category" element={<CategoryProducts />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/listing" element={<Listing />} />
//         <Route path="/hero-images" element={<HeroImages />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }




// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext.jsx";

// import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import SellerCenter from "./pages/SellerCenter.jsx";
import Categories from "./components/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import Listing from "./pages/Listing.jsx";
import HeroImages from "./components/HeroImages.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Cart from "./pages/Cart.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import Checkout from "./pages/Checkout.jsx";
import Order from "./pages/Order.jsx";
import Messages from "./pages/Messages.jsx";
import Products from "./pages/Products.jsx";
import AboutUs from "./pages/AboutUs.jsx";


export default function App() {
  const { user } = useAuth();

  const { loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // ⏳ Prevents flicker
  }

  return (
    <BrowserRouter>

      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected profile route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* Admin-only route */}
        <Route
          path="/sellerCenter"
          element={
            <ProtectedRoute adminOnly={true}>
              <SellerCenter />
            </ProtectedRoute>
          }
        />

        {/* Other routes */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/hero-images"
         element={
          <ProtectedRoute adminOnly={true}>
            <HeroImages />
          </ProtectedRoute>
         } 
         />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about"    element={<AboutUs />} />
        
      </Routes>
    </BrowserRouter>
  );
}