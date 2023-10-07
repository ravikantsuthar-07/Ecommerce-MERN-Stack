import express from "express";
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'
import {fileURLToPath} from 'url'

import connection from './Config/db.js';

import authRoutes from './routers/authRouter.js';
import categoryRoutes from './routers/categoryRoutes.js'
import productRoutes from './routers/productRoutes.js'
import cors from 'cors'

// .env Config
dotenv.config();


// database config
connection()

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename)

const app = express();


// Middle ware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './fontend/build')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

app.use('*', function(req, res){
    res.sendFile(path.join(__dirname ,'./fontend/build/index.html'));
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT} port`);
})
