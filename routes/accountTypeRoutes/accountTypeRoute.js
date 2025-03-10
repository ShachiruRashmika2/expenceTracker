const express = require('express');
const router = express.Router();
const accountTypeController = require('../../controllers/accountTypeController');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/admin/accountType', accountTypeController.getAllAccountTypes);
router.post('/admin/createAccType',authMiddleware.privilageAdmin, accountTypeController.createAccountType);

module.exports = router;