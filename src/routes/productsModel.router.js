import express from 'express'
import productManager from "../daos/products.dao.js"
const router = express.Router();


//? http://localhost:8000/api/products/ ==> trae todo
//? http://localhost:8000/api/products/?limit=2 ==> trae limitado

router.get('/',async (req,res) =>{
    const limit = parseInt(req.query.limit) || null;
    let resultado= null;
    console.log('leer producto productos  [' + limit +']')
    try {
        if(limit){
            console.log("con limit")
            resultado = await productManager.getProductByLimit(limit)
        }else{
            console.log("sin limit")
            resultado = await productManager.getProducts()
        }
        console.log(resultado)
        res.status(200).send({
            status:200,
            result:"success",
            payload:resultado
        })
    } catch (error) {
        console.log(`Mensaje de error: ${error}`)
        res.status(500).send({
            status:500,
            result:"error",
            error:"Error getting data from DB"
        });
    }
})

//? http://localhost:8000/api/products/1

router.get('/:pid', async (req,res) =>{
    let id = parseInt(req.params.pid);
    let resultado = await productManager.getProductById(id)
    res.send(resultado)
})



//? http://localhost:8000/api/products/
/* body 
{
    "tittle": "producto prueba3",
    "description": "Este es un producto prueba3",
    "price": 2,
    "thumbnail": "Sin imagen3",
    "code": "abc333",
    "stock": 21
}

*/
router.post('/addProduct', (req,res) =>{
    
    let body= req.body;
    console.log('router.post /addProduct')
    console.log(body)
    let resultado= productManager.addProduct(body.tittle,body.description,body.thumbnail,body.price,body.stock,body.code);
    //res.redirect("/realtimeproducts");
    res.render("products",{products});
    //res.send(resultado);
})

//? http://localhost:8000/api/products/
/*
{
    "tittle": "producto prueba1",
    "description": "Este es un producto prueba1",
    "price": 200,
    "thumbnail": "Sin imagen1",
    "code": "abc125",
    "stock": 25,
    "id": 1
} 
 */
router.put('/modProduct', async (req,res) =>{
    try{
        let body= req.body;
        let updRecord = {title:body.tittle,description:body.description,price:body.price,thumbnail:body.thumbnail,code:body.code,stock:body.stock}
        let data = await productManager.getProductById(body.id)
        let result= await productManager.updateProduct(data,updRecord)
        res.status(200).send({
            status:200,
            result:"success",
            payload:result
        })
    } catch(error) {
        console.log("Cannot update Product on Mongo: " + error);
        res.status(500).send({
            status:500,
            result:"error",
            error:"Error updating data on DB"
        });

    }
})


//? http://localhost:8000/api/products/1
//? http://localhost:9080/api/products/deleteProduct/:id

router.delete("/deleteProduct/:id", async (req, res) => {
    try{
        let id = parseInt(req.params.id);
        console.log('router.delete /deleteProduct/:id')
        console.log(id)
    
        let resultado = await productManager.getProductById(id)
        console.log(resultado._id)
        let result = await productManager.deleteProduct(resultado._id)
        res.status(200).send({
            status:200,
            result:"sucess",
            payload:result
        });
    } catch(error){

        console.log("Cannot delete Product on Mongo: " + error);
        res.status(500).send({
            status:500,
            result:"error",
            error:"Error deleting data on DB"
        });

    }
})

//? Test
// http://localhost:8000/product
// http://localhost:8000/product/1
// http://localhost:8000/product/?limit=2


export default router;

//? Test
//let productoNuevo = new productManager();
//productoNuevo.delArchivo();

// productoNuevo.addProduct('producto prueba1','Este es un producto prueba1',200,'Sin imagen1','abc123',25);
// productoNuevo.addProduct('producto prueba2','Este es un producto prueba2',200,'Sin imagen2','abc124',25);
// productoNuevo.addProduct('producto prueba3','Este es un producto prueba3',200,'Sin imagen3','abc121',25);
// productoNuevo.addProduct('producto prueba3','Este es un producto prueba3',200,'Sin imagen3','abc123',25); //codigo duplicado

//productoNuevo.getProducts();

//productoNuevo.getProductById(1);
// productoNuevo.getProductById(5);

//productoNuevo.deleteProduct(3);

//productoNuevo.updateProduct('producto prueba2','Este es un producto prueba2',400,'Sin','abc124',25,2);
//productoNuevo.updateProduct('prueba1','Este es un producto prueba1',200,'Sin imagen1','abc123',125,1);

