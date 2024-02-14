import mongoose from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    cid: Number,
    product:[{pid:Number,quantity:Number}]
})

export default mongoose.model(cartCollection, cartSchema);