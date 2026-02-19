const User = require('../models/User');

// @desc    Add product to favorites
// @route   POST /api/favorites/:id
// @access  Private
const addToFavorites = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const productId = req.params.id;

    if (user.favorites.includes(productId)) {
        return res.status(400).json({ message: 'Product already in favorites' });
    }

    user.favorites.push(productId);
    await user.save();

    res.status(200).json({ message: 'Added to favorites', favorites: user.favorites });
};

// @desc    Remove product from favorites
// @route   DELETE /api/favorites/:id
// @access  Private
const removeFromFavorites = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const productId = req.params.id;

    user.favorites = user.favorites.filter((id) => id.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Removed from favorites', favorites: user.favorites });
};

// @desc    Get user favorites
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
    const user = await User.findById(req.user._id).populate('favorites');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favorites);
};

module.exports = {
    addToFavorites,
    removeFromFavorites,
    getFavorites,
};
