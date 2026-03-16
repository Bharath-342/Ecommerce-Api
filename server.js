require("dotenv").config();

const express = require("express");
const cors = require("cors");
const compression = require("compression");

const  connectDB  = require("./config/db");
const { swaggerUi, swaggerSpec } = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const { protect } = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression());

// Root Route
app.get("/", (req, res) => {
  res.send("E-Commerce API Running");
});

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "API Working V2" });
});


// Swagger Documentation (Placed BEFORE routes for faster loading)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  swaggerOptions: {
    validatorUrl: null,
    docExpansion: "none"
  }
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


// Protected Test Route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user
  });
});


// Global Error Handler
app.use(errorHandler);


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});