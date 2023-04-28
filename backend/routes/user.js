import express from 'express';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.js';

dotenv.config();

const router = express.Router();

router.route("/signup").post(async (req,res) => {
    try {
        const { name, email, password, address } = req.body;
        if (name === undefined || email === undefined || password === undefined || address === undefined) {
            return res.status(400).json({ status: false, message: 'Required fields are missing.'})
        }
        if (await User.findOne({ email: email })) {
            return res.status(400).json({status: false, message: 'User already exists!'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
        });
        const token = jwt.sign({ id : newUser._id, email : newUser.email }, process.env.JWT_SECRET);
        console.log('User created successfully: ', newUser)
        res.status(200).json({status: true, token: token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, message: 'Unable to create a user! Please try again.'});
    }
});

router.route("/signin").post(async (req,res) => {
    try {
        const { email, password } = req.body;
        if (email === undefined || password === undefined) {
            return res.status(400).json({status: false, message: 'Required fields are missing.' })
        }
        const curr_user = await User.findOne({ email }).lean()
        if (!curr_user) {
            return res.status(404).json({status: false, message: 'User Not Found!' })
        }
        const matchpass = await bcrypt.compare(password, curr_user.password);
        if (!matchpass) {
            return res.status(400).json({status: false, message: 'Invalid Credentials! Please try again.' })
        }
        const token = jwt.sign({ id : curr_user._id, email : curr_user.email }, process.env.JWT_SECRET);
        console.log('Signed in successfully: ', curr_user);
        res.status(200).json({ status: true, message: "User logged in successfully.", token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: 'Unable to login! Please try again.'});
    }
});

router.route("/verify").get(async (req, res) => {
    // Getting the JWT token from header
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
    // Returning the user details
    const { _id, name, email, address, isAdmin } = user;
    return res.status(200).json({ id: _id, name, email, address, isAdmin });
})

export default router;