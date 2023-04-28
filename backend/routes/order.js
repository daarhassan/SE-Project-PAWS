import express from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.js';
import Product from '../db/models/product.js';
import Order from '../db/models/order.js';
dotenv.config();

const router = express.Router();

router.route("/:orderId").get(async (req, res) => {
    const orderId = req.params.orderId;
    try {
        // find the order by orderId and populate the products field
        const order = await Order.findById(orderId).populate('products.product');
        if (!order) {
            // if the order is not found, return a 404 response
            return res.status(404).json({ status: false, message: 'Order not found' });
        }
        // return the order details in the response
        return res.json({ status: true, order: order });
    } catch (err) {
        // if an error occurs, return a 500 response with the error message
        return res.status(500).json({ status: false, message: "Internal server error." });
    }
});

router.route("/").post(async (req, res) => {
    try {
        // Verify user is authenticated and has necessary permissions
        const authHeader = req.headers.authorization;
        const bearer = 'Bearer ';
        if (!authHeader || !authHeader.startsWith(bearer)) {
            return res.status(401).json({status: false, message: 'User not found OR is not authorized to get the data!' })
        }
        // Extracting the final token
        const token = authHeader.replace(bearer, '');
        const userJWT = jwt.verify(token, process.env.JWT_SECRET)
        // Extracting the user id from JWT token
        const userID = userJWT.id
        // If sender user is present or not
        const user = await User.findById(userID).lean()
        // If user is not found
        if (!user) {
            return res.status(401).json({status: false, message: 'User not found OR is not authorized to get the data!' })
        }

        // Check if all fields present
        if (!req.body.products || !req.body.address || !req.body.country || !req.body.city || req.body.products.length === 0) {
            return res.status(400).json({status: false, message: 'Missing required fields'});
        }

        // Retrieve requested products from database
        const products = await Promise.all(
            req.body.products.map((product) =>
                Product.findById(product.id).lean().exec()
            )
        );

        // Check that each product has enough inventory
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (product.inventory < req.body.products[i].quantity) {
                return res.status(400).json({status: false, message: `Insufficient inventory for product ${product.name}`});
            }
        }
    
        // Calculate total cost of the order
        const totalCost = req.body.products.reduce((acc, product, i) => {
            const productPrice = products.find(p => p._id.toString() === product.id.toString()).price;
            return acc + productPrice * product.quantity;
        }, 0);
    
        // Create new Order document
        const newOrder = new Order({
            user: userID,
            products: req.body.products.map((item) => ({
                product: item.id,
                quantity: item.quantity,
            })),
            totalAmount: totalCost,
            paymentMethod: 'Cash On Delivery', // hardcoded for this example
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
            status: 'Placed',
        });
    
        // Save new Order document to database
        await newOrder.save();
    
        // Deduct ordered quantities from product inventory
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            product.inventory -= req.body.products[i].quantity;
            await Product.findByIdAndUpdate(product._id, { inventory: product.inventory }).exec();
        }
    
        // Send success response to client
        return res.status(200).json({status: true, message: 'Order placed successfully', orderId: newOrder._id});
    } catch (error) {
        console.error(error);
        return res.status(500).json({status: false, message: 'Internal server error.'});
    }
});

export default router;