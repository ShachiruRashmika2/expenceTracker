const express = require('express');
const router = express.Router();
const resourceTypeController = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/OpenResource',authMiddleware.protect,resourceTypeController.openResource);
router.post('/CloseResource/:resourceId',authMiddleware.protect,resourceTypeController.closeResource);
router.get('/admin/GetAllResources',authMiddleware.privilageAdmin,resourceTypeController.getAllResources);
router.get('/user/GetAllResources',authMiddleware.protect,resourceTypeController.getUserResources);

module.exports = router;