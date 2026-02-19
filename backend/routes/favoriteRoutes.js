const express = require('express');
const {
    addToFavorites,
    removeFromFavorites,
    getFavorites,
} = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getFavorites);
router.route('/:id').post(protect, addToFavorites).delete(protect, removeFromFavorites);

module.exports = router;
