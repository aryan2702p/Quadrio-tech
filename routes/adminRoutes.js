const express = require('express');
const { dashboard } = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/dashboard', isAuthenticated, isAdmin, dashboard);

module.exports = router;
