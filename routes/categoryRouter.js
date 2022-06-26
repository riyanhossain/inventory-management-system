const express = require('express');
const { createCategory, updateCategory, deleteCategory, categories } = require('../controllers/categoryController');
const verifyJwtToken = require('../middlewares/verifyJwtToken');
const router = express.Router();

router.post('/create-category', verifyJwtToken, createCategory);

router.patch('/update-category', verifyJwtToken, updateCategory);

router.delete('/delete-category/:id', verifyJwtToken, deleteCategory);

router.get('/category-list', verifyJwtToken, categories);

module.exports = router;