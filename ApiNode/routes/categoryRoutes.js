const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// Lấy tất cả danh mục
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Thêm danh mục mới
router.post('/categories', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        position: req.body.position,
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Cập nhật danh mục
router.patch('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (req.body.name != null) {
            category.name = req.body.name;
        }
        if (req.body.position != null) {
            category.position = req.body.position;
        }
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Xóa danh mục
router.delete('/categories/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
