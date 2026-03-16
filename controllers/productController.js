const Product = require("../models/Product");
const productSchema = require("../validations/productValidation");
const mongoose = require("mongoose");

// Create Product
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

        const query = {
            name: { $regex: search, $options: "i" }
        };

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// Get Single Product
exports.getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

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

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, description } = req.body;

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    await product.save();

    res.json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// Delete Product
exports.deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully" });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};