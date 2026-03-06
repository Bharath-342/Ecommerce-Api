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
 *     summary: Create a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               description:
 *                 type: string
 *                 example: Apple smartphone
 *               price:
 *                 type: number
 *                 minimum: 1
 *                 example: 1200
 *               category:
 *                 type: string
 *                 example: Electronics
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *                 example: 10
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Invalid product data
 */
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);


module.exports = router;