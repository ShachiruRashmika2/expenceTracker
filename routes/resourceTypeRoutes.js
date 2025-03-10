const express = require('express');
const resourceTypeController = require('../controllers/resourceTypeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/admin/createResourceType',authMiddleware.privilageAdmin,resourceTypeController.createResourceType);
router.get('/admin/getAllResourceTypes',resourceTypeController.getAllResourceTypes);

module.exports = router;