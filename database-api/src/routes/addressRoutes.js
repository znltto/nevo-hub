const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');

router.post('/addresses', AddressController.create);
router.get('/clients/:clientId/addresses', AddressController.listByClient);
router.put('/addresses/:id', AddressController.update);
router.delete('/addresses/:id', AddressController.remove);

module.exports = router;