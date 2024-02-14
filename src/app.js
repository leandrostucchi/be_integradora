import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from './routes/views.router.js';
import productsRouter from "./routes/productsModel.router.js"
import cartsRouter from "./routes/cartsModel.router.js"
import { Server } from "socket.io";

import mongoose from "mongoose";
const port = 9080

const app = express();

//mongoose.connect("mongodb+srv://lstucchi:tGrjLHdnChKYsgoN@cluster0.s4wk2id.mongodb.net/");



const httpServer =  app.listen(port,() => console.log('Servidor arriba  puerto:' + port))

//mongoose.connect('mongodb+srv://lstucchi:tGrjLHdnChKYsgoN@cluster0.s4wk2id.mongodb.net/?retryWrites=true&w=majority');
const io = new Server(httpServer);

mongoose.connect('mongodb+srv://lstucchi:tGrjLHdnChKYsgoN@cluster0.s4wk2id.mongodb.net/ecommerce?retryWrites=true&w=majority')
//mongoose.connect('mongodb://localhost:27017/Ecommerce')
.then(success => console.log('Conectado a la base'))
.catch(error =>{
    if(error){
      console.log('No se pudo conectar a la base ' + error);
      process.exit();
    }
  });


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/ping',(req,res) =>{     res.send('pong') })


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use('/', viewsRouter)

//ROUTES
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado')

  socket.on("productsNew", async (data) => {
    console.log("Entre por aca addProduct" )
    console.log(data)
    //await productManager.addProduct(tittle,description,price,thumbnail,code,stock);
    await productManager.addProduct(''   ,data.name   ,''         ,data.price,0     ,'');
    io.emit("recibirProductos", productManager.getProducts());
  });

  socket.on("deleteProduct", async (productId) => {
    console.log("deleteProduct")
    console.log(productId)

    let num = Object.values(productId)
    // Encontrar el índice del producto con el productId
    await productManager.deleteProduct(parseInt(num));
    io.emit("recibirProductos", productManager.getProducts());
  });
 
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
})