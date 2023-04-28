import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connect.js';
import userRoute from './routes/user.js';
import orderRoute from './routes/order.js';
import productRoute from './routes/product.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: true}));


app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/product', productRoute);

app.get('/', async(req, res) =>{
    res.send('Hello World');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}, http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();