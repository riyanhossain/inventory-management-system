const productModel = require('../models/productModel');

const createProduct = async (req, res) => {
    try {
        const product = new productModel({
            ...req.body,
            user: req.user.id
        });
        await product.save();
        res.status(201).json({
            message: 'Product created successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        await productModel.updateOne({_id :req.params.id}, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        });
        res.status(200).json({
            message: 'Product updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        await productModel.deleteOne({_id :req.params.id});
        res.status(200).json({
            message: 'Product deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

const sortedProducts = async (req, res) => {
    try {
        const products = await productModel.find({user: req.user.id}).sort({category: 1});
        res.status(200).json({
            message: 'Products sorted successfully',
            products
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}
module.exports = {createProduct, updateProduct, deleteProduct , sortedProducts};