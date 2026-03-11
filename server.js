 require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const { swaggerUi, swaggerSpec } = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const { protect } = require("./middleware/authMiddleware");



const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("E-Commerce API Running");
});

app.use("/api/auth", authRoutes);

// Product Routes
app.use("/api/products", productRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Protected test route
app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.json({ status: "API Working V2" });
});
