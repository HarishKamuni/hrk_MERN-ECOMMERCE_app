const express = require('express');
const {
  uploadProduct,
  getAllProducts,
  updateProduct,
} = require('../controller/productController');
const authToken = require('../middleware/authToken');

const router = express.Router();

router.post('/upload-product', authToken, uploadProduct);
router.get('/all-products', getAllProducts);
router.post('/update-product', authToken, updateProduct);

module.exports = router;
