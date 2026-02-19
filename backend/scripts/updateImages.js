const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const updates = [
    {
        title: 'Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1000&q=80'
    },
    {
        title: 'Bluetooth Speaker',
        image: 'https://images.unsplash.com/photo-1621333104435-02118318288b?w=1000&q=80'
    }
];

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        for (const update of updates) {
            const product = await Product.findOne({ title: { $regex: update.title, $options: 'i' } });
            if (product) {
                console.log(`Found product: ${product.title}`);
                console.log(`Old Image: ${product.image}`);
                product.image = update.image;
                await product.save();
                console.log(`New Image: ${product.image}`);
                console.log(`-------------------`);
            } else {
                console.log(`Product NOT found: ${update.title}`);
            }
        }

        console.log('Update complete');
        process.exit(0);
    } catch (error) {
        console.error('Error updating images:', error);
        process.exit(1);
    }
};

updateImages();
