import { db } from '../services/db.js';

export const getProducts = (req, res) => {
  try {
    const { category, type, search, minPrice, maxPrice, sort } = req.query;
    const products = db.getProducts({ category, type, search, minPrice, maxPrice, sort });
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = db.getProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: `Product not found: ${id}` });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createProduct = (req, res) => {
  try {
    const { name, category, price, image } = req.body;
    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Name and price are required.' });
    }
    const product = db.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCategories = (req, res) => {
  try {
    const categories = db.getCategories();
    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCategoryById = (req, res) => {
  try {
    const { id } = req.params;
    const category = db.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: `Category not found: ${id}` });
    }
    const products = db.getProducts({ category: id });
    res.json({ success: true, data: { ...category, products } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
