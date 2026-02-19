const Product = require('../models/Product');
const User = require('../models/User');

const products = [
    {
        title: 'Wireless Headphones',
        price: 99.99,
        description: 'High-quality wireless headphones with noise cancellation.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    },
    {
        title: 'Smart Watch',
        price: 199.99,
        description: 'Track your fitness and stay connected with this smartwatch.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    },
    {
        title: 'Laptop Pro',
        price: 1299.99,
        description: 'Powerful laptop for professionals and creators.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    },
    {
        title: 'Mechanical Keyboard',
        price: 89.99,
        description: 'RGB mechanical keyboard with blue switches.',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
    },
    {
        title: 'Gaming Mouse',
        price: 49.99,
        description: 'High-precision gaming mouse with programmable buttons and RGB lighting.',
        image: 'https://images.unsplash.com/photo-1527443195645-1133e382f002?w=800&q=80',
    },
    {
        title: 'Bluetooth Speaker',
        price: 59.99,
        description: 'Portable bluetooth speaker with deep bass and waterproof design.',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    },
    {
        title: 'Canon Camera',
        price: 599.99,
        description: 'DSLR camera for stunning photography.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    },
    {
        title: 'E-Reader',
        price: 129.99,
        description: 'Read thousands of books on the go.',
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80',
    },
    {
        title: 'Desktop Monitor',
        price: 249.99,
        description: '27-inch 4K monitor for crisp visuals.',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    },
    {
        title: 'External SSD',
        price: 119.99,
        description: 'Fast and compact 1TB external SSD.',
        image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&q=80',
    },
];

const seedIfEmpty = async () => {
    try {
        console.log('>>> [SEEDER] Checking database status...');
        const count = await Product.countDocuments();
        console.log(`>>> [SEEDER] Current product count: ${count}`);

        if (count === 0) {
            console.log('>>> [SEEDER] Database is EMPTY. Starting auto-seed...');

            let admin = await User.findOne({ email: 'admin@example.com' });
            if (!admin) {
                console.log('>>> [SEEDER] Creating default admin user...');
                admin = await User.create({
                    name: 'Admin User',
                    email: 'admin@example.com',
                    password: 'password123'
                });
            } else {
                console.log('>>> [SEEDER] Using existing admin user.');
            }

            const sampleProducts = products.map(p => ({ ...p, createdBy: admin._id }));
            const result = await Product.insertMany(sampleProducts);
            console.log(`>>> [SEEDER] SUCCESS! Inserted ${result.length} products.`);
        } else {
            console.log('>>> [SEEDER] Database already has data. Skipping auto-seed.');
        }
    } catch (error) {
        console.error('>>> [SEEDER] ERROR DURING AUTO-SEED:');
        console.error(error.message);
    }
};

module.exports = seedIfEmpty;
