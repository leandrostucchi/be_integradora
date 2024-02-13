import mongoose from "mongoose";

const productCollection = 'Products'


const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: true
    },
    description: {
        type: String,
    },
    code: {
        type: String
        //required: true,
        //unique:true
    },
    price: {
        type: Number
        //required: true
    },
    stock: {
        type: Number
        //required: true
    },
    thumbnail:{
        type:String
    },
    id:{
        type: Number
        //required: true
    },
    status:{
        type:Boolean
    }
});

export default  mongoose.model(productCollection, ProductsSchema);

