import mongoose from "mongoose";

const productsCollection = 'products';
const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: {type: Number, required: true},
    thumbnail: { type: Image, unique: true},
    code: { type: Number, required: true},
    stock: { type: Number, default: 0},
    category: String,
    status: { type: Boolean, default: false},
    esVisible: {type: Boolean, default: false},
    id: {type: Number, index: true, unique: true}
})

export const Product = mongoose.model(productsCollection, productsSchema);
