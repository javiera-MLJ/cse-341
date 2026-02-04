const express = require('express');
const router = express.Router();

const productInventory = require('../controllers/inventory');
const validation = require('../middleware/validate');

router.get('/', productInventory.getAll);

router.get('/product/:productId', productInventory.getSingleByProduct);

router.get('/:id', productInventory.getSingleByInventory);

router.post('/', validation.saveInventory, productInventory.createStock);

router.put('/:id',validation.saveInventory, productInventory.updateStock);

router.delete('/:id', productInventory.deleteStock);

module.exports = router;