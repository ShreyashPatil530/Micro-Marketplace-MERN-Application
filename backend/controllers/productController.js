const Product = require('../models/Product');

// @desc    Get all products (with search and pagination)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    const pageSize = Number(req.query.limit) || 8;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword && req.query.keyword.trim() !== ''
        ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
    const { title, price, description, image } = req.body;

    const product = new Product({
        title,
        price,
        description,
        image,
        createdBy: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
    const { title, price, description, image } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        if (product.createdBy.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized to update this product' });
            return;
        }

        product.title = title || product.title;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        if (product.createdBy.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized to delete this product' });
            return;
        }

        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
