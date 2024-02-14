import express from 'express';
//import { Router } from 'express';
const router = express.Router();
import productManager from '../daos/products.dao.js';
import cartManager from '../daos/products.dao.js';

router.get('/', async (req, res) => {
  let products = await productManager.getProducts();
  res.render('home', { products });
});

router.get('/products', async (req, res) => {
  console.log("get products")
  let products = await productManager.getProducts();
  //res.render('products', { products });
});

router.get('/productsNew', async (req, res) => {
  console.log("get productsNew")
  let products = null;
  //let products = await productManager.getProducts();
  //console.log(products)
  res.render('productsNew', { products });
});

router.post('/addProduct', (req,res) =>{
  let body= req.body;
  console.log('router.post /addProduct')
  console.log(body)
  let resultado= productManager.addProduct
  (body.productTittle,body.productDescription,'',body.productPrice,body.productStock,body.productCode)
  //  (body.productTittle,body.description,body.thumbnail,body.price,body.stock,body.code);
  res.render("productsNew",
              {}
          );
  //res.send(resultado);
})

router.put('/updProduct', (req,res) =>{
  let body= req.body;
  console.log('router.put /updProduct')
  console.log(body)
})



router.get('/carts', async (req, res) => {
  console.log("get carts")
  let carts = await cartManager.readCartByID(cid)
  res.render('carts', { carts });
});


export default router;
