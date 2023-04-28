import express from 'express';
import cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import User from '../db/models/user.js';
import Product from '../db/models/product.js';

dotenv.config();

// Configure Multer
const upload = multer({
    dest: 'uploads/',
    onError : function(err, next) {
        console.log('File Error: ', err);
        next(err);
    },
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
          let extArray = file.mimetype.split("/");
          let extension = extArray[extArray.length - 1];
          cb(null, file.fieldname + '-' + Date.now()+ '.' + extension)
        }
    })
})

// Configure Cloudinary with your account details
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const router = express.Router();

router.route("/").post(upload.single('image'), async (req, res) => {
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
        // Check if user is admin
        if (!user.isAdmin) {
            return res.status(401).json({status: false, message: 'User is not authorized to create a new product!' })
        }
        // Get the product data from the request body
        const { name, description, price, animal, category, inventory } = req.body;
        // Verify input
        if (!name || !description || !price || !animal || !category || !inventory || !req.file || !req.file.path) {
            return res.status(400).json({status: false, message: 'Missing required fields.'});
        }
        // Upload the image to Cloudinary
        const image = req.file.path;
        const cloudinaryResult = await cloudinary.v2.uploader.upload(image);
    
        // Create the product document
        const product = new Product({
            name,
            description,
            price,
            animal,
            category,
            image: cloudinaryResult.secure_url,
            inventory,
        });
    
        // Save the product to the database
        await product.save();
        res.status(201).json({status: true, message: 'Product created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: false, message: 'Internal server error.'});
    }
});

// define a route to fetch all products based on the animal and category
router.route('/:animal/:category').get(async (req, res) => {
    const animal = req.params.animal;
    const category = req.params.category;
    try {
        // find all products that match the animal and category
        const products = await Product.find({ animal, category });
        // return the products in the response
        return res.json({ products });
    } catch (err) {
        // if an error occurs, return a 500 response with the error message
        return res.status(500).json({ status: false, message: err.message });
    }
});

export default router;