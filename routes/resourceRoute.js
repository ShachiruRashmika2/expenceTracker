const express = require('express');
const router = express.Router();
const resourceTypeController = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/OpenResource',authMiddleware.protect,resourceTypeController.openResource);

module.exports = router;