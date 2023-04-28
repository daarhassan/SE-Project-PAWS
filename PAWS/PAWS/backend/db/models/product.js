import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        required: true,
        type: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    animal: {
        enum: ["cats", "dogs"],
        type: String,
        required: true,
    },
    category: {
        enum: ["foods", "accessories", "toys"],
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 5,
    },
    inventory: {
        type: Number,
        required: true,
        default: 1,
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;