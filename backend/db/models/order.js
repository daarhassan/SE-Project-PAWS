import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        address: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ['Cash On Delivery', 'Credit Card'],
            default: 'Cash On Delivery',
            required: true,
        },
        status: {
            type: String,
            enum: ['Placed', 'Shipped', 'Delivered'],
            default: 'Placed',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual property to calculate the total quantity of products in the order
orderSchema.virtual('totalQuantity').get(function () {
  return this.products.reduce((acc, product) => acc + product.quantity, 0);
});

const Order = mongoose.model('Order', orderSchema);

export default Order;