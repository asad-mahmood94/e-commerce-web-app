// // server.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import multer from "multer";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import path from "path";
// import { fileURLToPath } from "url";

// const PORT = 5000;
// const MONGO_URI = "mongodb://127.0.0.1:27017/shopEase";
// const JWT_SECRET = "your_jwt_secret_key";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ====== MongoDB ======
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// // ====== Multer ======
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // ====== Models ======
// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   profileImage: String,
//   isAdmin: { type: Boolean, default: false }
// });
// const User = mongoose.model("User", userSchema);

// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   category: String,
//   productImage: String
// });
// const Product = mongoose.model("Product", productSchema);

// const getFullImageUrl = (req, imagePath) => {
//   if (!imagePath) return "";
//   return `${req.protocol}://${req.get("host")}${imagePath}`;
// };

// // ====== Middleware ======
// const verifyAdmin = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ success: false, message: "No token" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (!decoded.isAdmin) {
//       return res.status(403).json({ success: false, message: "Not authorized" });
//     }
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// // ====== Signup ======
// app.post("/api/signup", upload.single("profileImage"), async (req, res) => {
//   try {
//     const { email, password, isAdmin } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const profileImagePath = req.file ? `/uploads/${req.file.filename}` : "";

//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       profileImage: profileImagePath,
//       isAdmin: isAdmin === "true"
//     });
//     await newUser.save();

//     const token = jwt.sign(
//       { id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Signup successful!",
//       token,
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         isAdmin: newUser.isAdmin,
//         profileImage: getFullImageUrl(req, profileImagePath),
//       },
//     });
//   } catch (err) {
//     console.error("Error in signup:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ====== Login ======
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email, isAdmin: user.isAdmin },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful!",
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         profileImage: getFullImageUrl(req, user.profileImage),
//       },
//     });
//   } catch (err) {
//     console.error("Error in login:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ====== Add Product (Admin only) ======
// app.post("/api/products", verifyAdmin, upload.single("productImage"), async (req, res) => {
//   try {
//     const { name, description, price, category } = req.body;

//     // Allowed categories
//     const allowedCategories = ["Electronics", "Fashion", "Home Decor"];
//     if (!allowedCategories.includes(category)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid category. Allowed: Electronics, Fashion, Home Decor",
//       });
//     }

//     const productImagePath = req.file ? `/uploads/${req.file.filename}` : "";

//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       category,
//       productImage: productImagePath
//     });

//     await newProduct.save();
//     res.json({
//       success: true,
//       message: "Product added successfully",
//       product: {
//         ...newProduct._doc,
//         productImage: getFullImageUrl(req, productImagePath)
//       }
//     });
//   } catch (err) {
//     console.error("Error adding product:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Get products by category (case-insensitive)
// app.get("/api/products/category/:category", async (req, res) => {
//   try {
//     const categoryParam = req.params.category.replace(/-/g, " ");
//     const products = await Product.find({
//       category: { $regex: new RegExp(`^${categoryParam}$`, "i") }
//     });
//     res.json({ success: true, products });
//   } catch (err) {
//     console.error("Error fetching category products:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Get single product by ID
// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
//     res.json({ success: true, product });
//   } catch (err) {
//     console.error("Error fetching product:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ====== Get All Products (Public) ======
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();

//     res.json({
//       success: true,
//       products: products.map(p => ({
//         ...p._doc,
//         productImage: getFullImageUrl(req, p.productImage)
//       }))
//     });
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ====== Delete Product (Admin only) ======
// app.delete("/api/products/:id", verifyAdmin, async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Product deleted successfully",
//       deletedProduct,
//     });
//   } catch (err) {
//     console.error("Error deleting product:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });



// //---------------------------Hero Section---------------------------------//  
// // ====== Hero Image Schema ======
// const heroImageSchema = new mongoose.Schema({
//   imageUrl: String,
//   createdAt: { type: Date, default: Date.now }
// });
// const HeroImage = mongoose.model("HeroImage", heroImageSchema);

// // ====== Hero Images Routes ======

// // Upload hero image (Admin only)
// app.post("/api/hero-images", verifyAdmin, upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });

//     const imagePath = `/uploads/${req.file.filename}`;
//     const newHeroImage = new HeroImage({ imageUrl: imagePath });
//     await newHeroImage.save();

//     res.json({
//       success: true,
//       message: "Hero image uploaded",
//       image: { id: newHeroImage._id, imageUrl: getFullImageUrl(req, imagePath) }
//     });
//   } catch (err) {
//     console.error("Error uploading hero image:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Get all hero images (Public)
// app.get("/api/hero-images", async (req, res) => {
//   try {
//     const images = await HeroImage.find().sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       images: images.map(img => ({
//         id: img._id,
//         imageUrl: getFullImageUrl(req, img.imageUrl)
//       }))
//     });
//   } catch (err) {
//     console.error("Error fetching hero images:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Delete hero image (Admin only)
// app.delete("/api/hero-images/:id", verifyAdmin, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await HeroImage.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "Image not found" });
//     }
//     res.json({ success: true, message: "Hero image deleted" });
//   } catch (err) {
//     console.error("Error deleting hero image:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// app.listen(PORT, () =>
//   console.log(`🚀 Server running at http://localhost:${PORT}`)
// );












// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/shopEase";
const JWT_SECRET = "your_jwt_secret_key";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ====== MongoDB ======
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ====== Multer ======
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ====== Models ======
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  profileImage: String,
  isAdmin: { type: Boolean, default: false }
});
const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  productImage: String
});
const Product = mongoose.model("Product", productSchema);

const heroImageSchema = new mongoose.Schema({
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});
const HeroImage = mongoose.model("HeroImage", heroImageSchema);

const getFullImageUrl = (req, imagePath) => {
  if (!imagePath) return "";
  return `${req.protocol}://${req.get("host")}${imagePath}`;
};

// ====== Middleware ======
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    next();
  });
};

// ====== Signup ======
app.post("/api/signup", upload.single("profileImage"), async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profileImagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newUser = new User({
      email,
      password: hashedPassword,
      profileImage: profileImagePath,
      isAdmin: isAdmin === "true"
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, message: "Signup successful!", token });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ====== Login ======
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, message: "Login successful!", token });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ====== Get Logged-in User (/api/auth/me) ======
app.get("/api/auth/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: getFullImageUrl(req, user.profileImage),
      },
    });
  } catch (err) {
    console.error("Error in /api/auth/me:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// ====== Product Routes ======
app.post("/api/products", verifyAdmin, upload.single("productImage"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const allowedCategories = ["Electronics", "Fashion", "Home Decor"];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Allowed: Electronics, Fashion, Home Decor",
      });
    }

    const productImagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      productImage: productImagePath
    });

    await newProduct.save();
    res.json({
      success: true,
      message: "Product added successfully",
      product: {
        ...newProduct._doc,
        productImage: getFullImageUrl(req, productImagePath)
      }
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/products/category/:category", async (req, res) => {
  try {
    const categoryParam = req.params.category.replace(/-/g, " ");
    const products = await Product.find({
      category: { $regex: new RegExp(`^${categoryParam}$`, "i") }
    });
    res.json({ success: true, products });
  } catch (err) {
    console.error("Error fetching category products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      products: products.map(p => ({
        ...p._doc,
        productImage: getFullImageUrl(req, p.productImage)
      }))
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/api/products/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ====== Hero Images Routes ======
app.post("/api/hero-images", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });

    const imagePath = `/uploads/${req.file.filename}`;
    const newHeroImage = new HeroImage({ imageUrl: imagePath });
    await newHeroImage.save();

    res.json({
      success: true,
      message: "Hero image uploaded",
      image: { id: newHeroImage._id, imageUrl: getFullImageUrl(req, imagePath) }
    });
  } catch (err) {
    console.error("Error uploading hero image:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/hero-images", async (req, res) => {
  try {
    const images = await HeroImage.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      images: images.map(img => ({
        id: img._id,
        imageUrl: getFullImageUrl(req, img.imageUrl)
      }))
    });
  } catch (err) {
    console.error("Error fetching hero images:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/api/hero-images/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HeroImage.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }
    res.json({ success: true, message: "Hero image deleted" });
  } catch (err) {
    console.error("Error deleting hero image:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ====== Cart Schema ======
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 }
});
const Cart = mongoose.model("Cart", cartSchema);

// ====== Cart Routes ======

// Add/Update Cart Item
app.post("/api/cart", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    // check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // check if cart already has this product
    let cartItem = await Cart.findOne({ userId: req.user.id, productId });

    if (cartItem) {
      // update quantity
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      // add new
      cartItem = new Cart({
        userId: req.user.id,
        productId,
        quantity: quantity || 1
      });
      await cartItem.save();
    }

    res.json({ success: true, message: "Cart updated", cartItem });
  } catch (err) {
    console.error("Error in /api/cart POST:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get Cart Items for Logged-in User
app.get("/api/cart", verifyToken, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id })
      .populate("productId");

    const formattedItems = cartItems.map(item => ({
      id: item._id,
      quantity: item.quantity,
      product: {
        id: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,
        price: item.productId.price,
        category: item.productId.category,
        productImage: getFullImageUrl(req, item.productId.productImage)
      }
    }));

    res.json({ success: true, cart: formattedItems });
  } catch (err) {
    console.error("Error in /api/cart GET:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Remove single item from cart
app.delete("/api/cart/:productId", verifyToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const deleted = await Cart.findOneAndDelete({ userId: req.user.id, productId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }
    res.json({ success: true, message: "Item removed from cart" });
  } catch (err) {
    console.error("Error in /api/cart/:productId DELETE:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Clear entire cart
app.delete("/api/cart", verifyToken, async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user.id });
    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    console.error("Error in /api/cart DELETE:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});








// ====== Order Schema ======
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending, Processing, Shipped, Delivered, Cancelled
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", orderSchema);

// ====== Order Routes ======

// Create a new order
app.post("/api/orders", verifyToken, async (req, res) => {
  try {
    const { fullName, address, phone } = req.body;

    // Validate required fields
    if (!fullName || !address || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: "Full name, address, and phone are required" 
      });
    }

    // Get user's cart items
    const cartItems = await Cart.find({ userId: req.user.id }).populate("productId");
    
    if (cartItems.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Cart is empty" 
      });
    }

    // Calculate total amount and prepare order items
    let totalAmount = 0;
    const orderItems = cartItems.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      totalAmount += itemTotal;
      
      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      };
    });

    // Create new order
    const newOrder = new Order({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      fullName,
      address,
      phone,
      status: "Pending"
    });

    await newOrder.save();

    // Clear the user's cart after successful order
    await Cart.deleteMany({ userId: req.user.id });

    res.json({ 
      success: true, 
      message: "Order placed successfully!", 
      order: newOrder 
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get user's orders
app.get("/api/orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all orders (admin only)
app.get("/api/orders/all", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId")
      .populate("userId", "email")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});





// Cancel order (user can cancel within 24 hours)
app.put("/api/orders/:id/cancel", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the order
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }
    
    // Check if the order belongs to the user
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized to cancel this order" 
      });
    }
    
    // Check if order is already cancelled
    if (order.status === "Cancelled") {
      return res.status(400).json({ 
        success: false, 
        message: "Order is already cancelled" 
      });
    }
    
    // Check if order can be cancelled (within 24 hours)
    const orderTime = new Date(order.createdAt).getTime();
    const currentTime = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if ((currentTime - orderTime) > twentyFourHours) {
      return res.status(400).json({ 
        success: false, 
        message: "Order can only be cancelled within 24 hours of placement" 
      });
    }
    
    // Check if order is in a cancellable state
    if (order.status !== "Pending") {
      return res.status(400).json({ 
        success: false, 
        message: "Order can only be cancelled while it's in Pending status" 
      });
    }
    
    // Update order status to Cancelled
    order.status = "Cancelled by customer";
    await order.save();
    
    res.json({ 
      success: true, 
      message: "Order cancelled successfully",
      order 
    });
  } catch (err) {
    console.error("Error cancelling order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// this is 2
// Update order status (admin only)
app.put("/api/orders/:id/status", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the order first
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    // Check if order was cancelled by user
    if (order.status === "Cancelled by customer") {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot update order cancelled by customer" 
      });
    }

    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled by seller"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid status. Allowed: Pending, Processing, Shipped, Delivered, Cancelled by seller" 
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("items.productId").populate("userId", "email");

    res.json({ 
      success: true, 
      message: "Order status updated", 
      order: updatedOrder 
    });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




// ====== Sales Data Route ======
app.get("/api/orders/sales", verifyAdmin, async (req, res) => {
  try {
    const { range } = req.query;
    let startDate = new Date();
    let endDate = new Date();
    
    // Set the start date based on the range
    switch (range) {
      case "today":
        startDate.setHours(0, 0, 0, 0); // Start of today
        break;
      case "weekly":
        startDate.setDate(startDate.getDate() - 7); // Last 7 days
        break;
      case "monthly":
        startDate.setMonth(startDate.getMonth() - 6); // Last 6 months
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid range parameter. Use 'today', 'weekly', or 'monthly'"
        });
    }

    // Aggregate sales data
    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: { $nin: ["Cancelled by me", "Cancelled by seller"] } // Exclude cancelled orders
        }
      },
      {
        $group: {
          _id: {
            // Group by day, week, or month based on range
            ...(range === "today" && {
              hour: { $hour: "$createdAt" }
            }),
            ...(range === "weekly" && {
              day: { $dayOfWeek: "$createdAt" }
            }),
            ...(range === "monthly" && {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" }
            })
          },
          sales: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    // Format the data for frontend
    let formattedData = [];
    let totalSales = 0;
    let ordersCount = 0;

    if (range === "today") {
      // Create data for all 24 hours, even if no sales
      for (let hour = 0; hour < 24; hour++) {
        const hourData = salesData.find(item => item._id.hour === hour);
        const sales = hourData ? hourData.sales : 0;
        const orders = hourData ? hourData.orders : 0;
        
        formattedData.push({
          hour: `${hour}H`,
          sales,
          orders
        });
        
        totalSales += sales;
        ordersCount += orders;
      }
    } else if (range === "weekly") {
      // Map day numbers to day names
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
      for (let day = 1; day <= 7; day++) {
        const dayData = salesData.find(item => item._id.day === day);
        const sales = dayData ? dayData.sales : 0;
        const orders = dayData ? dayData.orders : 0;
        
        formattedData.push({
          day: dayNames[day - 1],
          sales,
          orders
        });
        
        totalSales += sales;
        ordersCount += orders;
      }
    } else if (range === "monthly") {
      // Get last 6 months
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentDate = new Date();
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - i);
        
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        const monthData = salesData.find(item => 
          item._id.month === month && item._id.year === year
        );
        
        const sales = monthData ? monthData.sales : 0;
        const orders = monthData ? monthData.orders : 0;
        
        formattedData.push({
          month: monthNames[date.getMonth()],
          sales,
          orders
        });
        
        totalSales += sales;
        ordersCount += orders;
      }
    }

    res.json({
      success: true,
      data: {
        salesData: formattedData,
        totalSales,
        ordersCount
      }
    });
  } catch (err) {
    console.error("Error fetching sales data:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching sales data"
    });
  }
});




app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);










