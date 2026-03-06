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

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product
 *     description: Admin can create a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);


module.exports = router;