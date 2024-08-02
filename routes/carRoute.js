const express = require('express');
const { createCar, getCars, updateCar, deleteCar } = require('../controllers/carController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', isAuthenticated, isAdmin, createCar);
router.get('/', isAuthenticated,getCars);
router.put('/:id', isAuthenticated, isAdmin, updateCar);
router.delete('/:id', isAuthenticated, isAdmin, deleteCar);

module.exports = router;
