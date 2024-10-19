const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Thêm sản phẩm mới
router.post('/products', async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Cập nhật sản phẩm
router.patch('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (req.body.name != null) {
        product.name = req.body.name;
      }
      if (req.body.price != null) {
        product.price = req.body.price;
      }
      if (req.body.description != null) {
        product.description = req.body.description;
      }
      if (req.body.image != null) {
        product.image = req.body.image;
      }
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Xóa sản phẩm
router.delete('/products/:id', async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Sản phẩm đã xóa' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
module.exports = router;
