import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    carritoId: {
        type: Number,
        required: true,
        index: true,
    },
    productoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    producto: {
        type: String,
        index: true
    }
})



export const Carts = mongoose.model(cartsCollection, cartsSchema);