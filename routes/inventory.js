const express = require('express');
const router = express.Router();

const productInventory = require('../controllers/inventory');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', productInventory.getAll);

router.get('/product/:productId', productInventory.getSingleByProduct);

router.get('/:id', productInventory.getSingleByInventory);

router.post('/', isAuthenticated, productInventory.createStock);

router.put('/:id',isAuthenticated, productInventory.updateStock);

router.delete('/:id',isAuthenticated, productInventory.deleteStock);

module.exports = router;