const permission = require('./../helpers/permission');
const ProductModel = require('./../models/productModel');

const uploadProduct = async (req, res) => {
  try {
    const sessionId = req.userId;
    if (!permission(sessionId)) {
      throw new Error('Permission Denied!!');
    }
    const uploadProduct = new ProductModel(req.body);
    const saveProduct = await uploadProduct.save();
    res.status(200).json({
      message: 'product uploaded successfully!!',
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'All Products',
      error: false,
      success: true,
      data: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const sessionId = req.userId;
    if (!permission(sessionId)) {
      throw new Error('Permission Denied!!');
    }
    const { _id, ...restData } = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(_id, restData);
    res.status(200).json({
      message: 'Product updated successfully!!',
      error: false,
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = { uploadProduct, getAllProducts, updateProduct };
