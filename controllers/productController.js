import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from '../models/categoryModel.js'
import fs from 'fs'
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from 'dotenv';

dotenv.config()

let gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is Required and Photo size is less than 1MB" });
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: 'Product Created Successfully',
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Creating Product',
            error
        })
    }
};

export const getProductController = async (req, res) => {
    try {
        const product = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: 'All Product',
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Getting Product',
            error
        })
    }
};

export const singleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).populate('category');
        res.status(200).send({
            success: true,
            message: 'Get product Succesfully',
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Getting Product",
            error
        });
    }
};

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Product Photo',
            error
        })
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success: true,
            message: 'Product Delete Successfully',
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: true,
            message: 'Error in Deleting Product',
            error
        });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is Required and Photo size is less than 1MB" });
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        res.status(200).send({
            success: true,
            message: 'Product Update Successfully',
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Update Product',
            error
        })
    }
};

// Filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const product = await productModel.find(args);
        res.status(200).send({
            success: true,
            message: 'Getting Filters Product',
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error While Filtering Products',
            error
        })
    }
};


export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Product Count',
            error
        });
    }
};

// product list based on page
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const product = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: 'Per page product Successfully',
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in per page product',
            error
        });
    }
};

// Search Product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const product = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Per page product Successfully',
            product
        });
        // return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in search product',
            error
        })
    }
};

export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const product = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category");
        res.status(200).send({
            success: true,
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Related Product',
            error
        });
    }
};

export const productCategoryController = async (req, res) => {
    try {
        console.log(req.params.slug);
        const category = await categoryModel.findOne({ slug: req?.params.slug })
        const product = await productModel.find({ category }).populate('category');
        res.status(200).send({
            success: true,
            message: 'Successfully get category wise product',
            category,
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get Product wise Category',
            error
        });
    }
};

// Payment Getway Api
//Token
export const braintreeTokenController = async (req, res) => { 
    try {
        gateway.clientToken.generate({}, function (err, responce){
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(responce)
            }
        })
    } catch (error) {
        console.log(error);
    }
};

// Payment
export const braintreePaymentController = async (req, res) => { 
    try {
        const  {cart, nonce} = req.body;
        let total = 0;
        cart.map( (i) => {
            total  += i.price
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement: true
            }
        },
        function(err, result){
            if (result) {
                const orders = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id,
                }).save()
                console.log(orders);
                res.json({ok: true})
            }else{
                res.status(500).send(err)
            }
        })
    } catch (error) {
        console.log(error);
    }
};