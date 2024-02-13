import express from 'express';
//import { Router } from 'express';
const router = express.Router();
import productManager from '../daos/products.dao.js';

router.get('/', async (req, res) => {
  let products = await productManager.getProducts();
  res.render('home', { products });
});

router.get('/products', async (req, res) => {
  console.log("get products")
  let products = await productManager.getProducts();
  res.render('products', { products });
  //res.render('realTimeProducts', { products });
});

router.get('/productsNew', async (req, res) => {
  console.log("get productsNew")
  let products = await productManager.getProducts();
  console.log(products)
  res.render('productsNew', { products });
  //res.render('realTimeProducts', { products });
});


export default router;
