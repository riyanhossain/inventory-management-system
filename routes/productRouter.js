const express = require('express');
const { createProduct, updateProduct, deleteProduct, sortedProducts } = require('../controllers/productController');
const verifyJwtToken = require('../middlewares/verifyJwtToken');
const router = express.Router();

router.post('/create-product', verifyJwtToken, createProduct);

router.patch('/update-product/:id', verifyJwtToken, updateProduct);

router.delete('/delete-product/:id', verifyJwtToken, deleteProduct);

router.get('/products-list', verifyJwtToken, sortedProducts);

module.exports = router;
