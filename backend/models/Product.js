const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            default: 0,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        image: {
            type: String,
            required: [true, 'Please add an image URL'],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
