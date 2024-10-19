const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/NHOM5_DuanTN');


// Thiết lập route mẫu
app.get('/', (req, res) => {
    res.send('Chào mừng đến với API ');
});

// Router
const productRoutes = require('./routes/productRoutes');
const categoriesRouter = require('./routes/categoryRoutes');

// Sử dụng router
app.use('/api', productRoutes);
app.use('/api', categoriesRouter);

// Lắng nghe server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server chạy trên cổng ${PORT}`);
});
