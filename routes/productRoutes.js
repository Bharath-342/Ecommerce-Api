const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Returns paginated list of products
 *     responses:
 *       200:
 *         description: List of products
 */


// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);


// Admin routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);


module.exports = router;