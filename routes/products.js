const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', productController.getAll);

router.get('/:id', productController.getSingle);

router.post('/', isAuthenticated, productController.createProduct);

router.put('/:id',isAuthenticated, productController.updateProduct);

router.delete('/:id',isAuthenticated, productController.deleteProduct);

module.exports = router;