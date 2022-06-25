const categoryModel = require('../models/categoryModel');
const productModel = require('../models/productModel');

const createCategory = async (req, res) => {
    try {
        const category = new categoryModel({
            ...req.body,
            user: req.user.id
        });
        await category.save();
        res.status(201).json({
            message: 'Category created successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await categoryModel.updateOne({_id :req.params.id},req.body);
        if(req.body.name === category.name){
            return res.status(200).json({
                message: 'Category updated successfully',
            })
        }else{
            await productModel.updateMany({category: category.name}, {
                category: req.body.name,
            })
            return res.status(200).json({
                message: 'Category updated successfully',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndDelete({_id :req.params.id});
        if(category){
            await productModel.deleteMany({category: category.name});
            return res.status(200).json({
                message: 'Category deleted successfully',
            })
        }else{
            return res.status(404).json({
                message: 'Category not found',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

const categories = async (req, res) => {
    try {
        const categories = await categoryModel.find({user: req.user.id}).sort({name: 1});
        res.status(200).json({
            message: 'Categories retrieved successfully',
            categories
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    categories,
}