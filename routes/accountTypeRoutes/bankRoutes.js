const bankController = require('../../controllers/bankController');
const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/admin/createBank',authMiddleware.privilageAdmin,bankController.createBank);
router.get('/admin/getAllBanks',bankController.getAllBanks);
router.delete('/admin/deleteBank/:id',authMiddleware.privilageAdmin,bankController.deleteBank);
router.put('/admin/updateBank/:id',authMiddleware.privilageAdmin,bankController.updateBank);

module.exports = router;