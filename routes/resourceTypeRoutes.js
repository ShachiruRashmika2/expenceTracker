const express = require('express');
const resourceTypeController = require('../controllers/resourceTypeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/admin/createResourceType',authMiddleware.privilageAdmin,resourceTypeController.createResourceType);
router.post('/user/createResourceType',authMiddleware.protect,resourceTypeController.createResourceType);
router.get('/admin/getAllResourceTypes',resourceTypeController.getAllResourceTypes);
router.get('/user/getAllResourceTypes',authMiddleware.protect,resourceTypeController.getUserResourceTypes);

module.exports = router;