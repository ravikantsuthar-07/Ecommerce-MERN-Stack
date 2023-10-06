import express from "express";
import dotenv from 'dotenv'
import morgan from 'morgan'
// import body-parser from 'bodyParser';

import connection from './Config/db.js';

import authRoutes from './routers/authRouter.js';
import categoryRoutes from './routers/categoryRoutes.js'
import productRoutes from './routers/productRoutes.js'
import cors from 'cors'

// .env Config
dotenv.config();


// database config
connection()

const app = express();


// Middle ware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)


const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT} port`);
})