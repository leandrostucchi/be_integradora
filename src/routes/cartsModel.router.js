import express from 'express'
import productManager from "../daos/products.dao.js"
import cartManager from "../daos/carts.dao.js" 
const cartsRouter = express.Router();


//? http://localhost:8000/api/carts/1
cartsRouter.get('/:cid', async (req,res) =>{
    const cid = parseInt(req.params.cid) || null;
    let resultado= null;
    console.log('leer cart  [' + cid +']')
    try {
        if(cid){
            resultado = await cartManager.getCartById(cid)
            console.log(resultado)
        }            
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

//? http://localhost:8000/api/carts/

cartsRouter.post('/', async (req,res) =>{
    let resultado= null;
    try {
        resultado = await cartManager.InitCarts()
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

//? http://localhost:8000/api/carts/1/product/1
/*
{
    "quantity": 12
}
*/
cartsRouter.put('/modCart/:cid/product/:pid', async (req,res) =>{
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    let body= req.body;
    let resultadoCart = await cartManager.getCartById(cid)
    let resultadoProduct = await productManager.getProductById(pid)
    if(resultadoCart && resultadoProduct){
        let resultado= null;
        try {
            let cantidad = 1;
            if(body.quantity){
                cantidad = body.quantity;
            }
            if(!resultadoCart.product) resultadoCart.product = []
            let producto = null
            if(resultadoCart == null || resultadoCart.product.length== 0){
                producto = [{pid:pid,quantity:cantidad,_id:resultadoProduct._id}]
            }else{
                let productOut = resultadoCart.product.some(x => x.pid != pid) ? resultadoCart.product.find(x => x.pid != pid): null;
                let productIn  = resultadoCart.product.some(x => x.pid == pid) ?resultadoCart.product.find(x => x.pid == pid) : null
                if (!productOut && !productIn){
                    producto = [{pid:pid,quantity:cantidad,_id:resultadoProduct._id}]
                } else if (!productOut && productIn){
                        producto = [{pid:pid,quantity:productIn.quantity + cantidad,_id:resultadoProduct._id}]
                } else if (productOut && productIn){
                    producto = [{pid:pid,quantity:productIn.quantity + cantidad,_id:resultadoProduct._id}]
                }else if (productOut && !productIn){
                    producto = [{pid:pid,quantity:cantidad,_id:resultadoProduct._id},productOut]
                }
            }
            resultado= await cartManager.updateCart(resultadoCart,producto)
            //console.log(resultado)
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
    }else{
        if(!resultadoCart){
            console.log(`Mensaje de Warning: Warning: Cart Not Found ${cid}`)
            res.status(100).send({
                status:100,
                result:"warning",
                error: `Warning: Cart Not Found ${cid}`
            });
            res.send(`Cart Not Found ${cid}` )
        } 
        if(!resultadoProduct){
            console.log(`Mensaje de Warning: Warning: Product Not Found ${cid}`)
            res.status(100).send({
                status:100,
                result:"warning",
                error: `Warning: Product Not Found ${cid}`
            });
        } 
    }
})

export default cartsRouter;