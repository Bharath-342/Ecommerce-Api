const Product = require("../models/Product");
const productSchema = require("../validations/productValidation");

exports.createProduct = async (req, res) => {

    try {

        const { error } = productSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, description, price, category, stock } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            createdBy: req.user.id
        });

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// Get Products (Pagination + Search)
exports.getProducts = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const search = req.query.search || "";

        const { count, rows: products } = await Product.findAndCountAll({
            where: process.sequelize?.where(
                process.sequelize?.fn("LOWER", process.sequelize?.col("name")),
                "LIKE",
                `%${search.toLowerCase()}%`
            ),
            offset: (page - 1) * limit,
            limit: limit
        });

        res.json({
            page,
            totalPages: Math.ceil(count / limit),
            totalProducts: count,
            products
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// Get Single Product
exports.getProductById = async (req, res) => {

    console.log("Pagination controller running");

    try {

        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// Update Product
exports.updateProduct = async (req, res) => {

    try {

        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await product.update(req.body);

        res.json(updatedProduct);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// Delete Product
exports.deleteProduct = async (req, res) => {

    try {

        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();

        res.json({ message: "Product deleted successfully" });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};