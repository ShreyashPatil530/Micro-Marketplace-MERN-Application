const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
    },
    {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
    },
];

const products = [
    {
        title: 'Wireless Headphones',
        price: 99.99,
        description: 'High-quality wireless headphones with noise cancellation.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    },
    {
        title: 'Smart Watch',
        price: 199.99,
        description: 'Track your fitness and stay connected with this smartwatch.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    },
    {
        title: 'Laptop Pro',
        price: 1299.99,
        description: 'Powerful laptop for professionals and creators.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
    },
    {
        title: 'Mechanical Keyboard',
        price: 89.99,
        description: 'RGB mechanical keyboard with blue switches.',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80',
    },
    {
        title: 'Gaming Mouse',
        price: 49.99,
        description: 'High-precision gaming mouse with programmable buttons and RGB lighting.',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1000&q=80',
    },
    {
        title: 'Bluetooth Speaker',
        price: 59.99,
        description: 'Portable bluetooth speaker with deep bass and waterproof design.',
        image: 'https://images.unsplash.com/photo-1621333104435-02118318288b?w=1000&q=80',
    },
    {
        title: 'Canon Camera',
        price: 599.99,
        description: 'DSLR camera for stunning photography.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
    },
    {
        title: 'E-Reader',
        price: 129.99,
        description: 'Read thousands of books on the go.',
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&q=80',
    },
    {
        title: 'Desktop Monitor',
        price: 249.99,
        description: '27-inch 4K monitor for crisp visuals.',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    },
    {
        title: 'External SSD',
        price: 119.99,
        description: 'Fast and compact 1TB external SSD.',
        image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=500&q=80',
    },
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, createdBy: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
