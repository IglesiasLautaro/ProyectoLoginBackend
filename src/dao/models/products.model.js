import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;
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

productSchema.plugin(mongoosePaginate)

const Product = model('Product', productSchema);

export default Product;