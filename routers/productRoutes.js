import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import {
    createProductController,
    deleteProductController,
    getProductController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    singleProductController,
    updateProductController,
    searchProductController,
    relatedProductController,
    productCategoryController,
    braintreeTokenController,
    braintreePaymentController
} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router()

// Create Product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// Update Product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//Get All Product
router.get('/get-product', getProductController);

// Get Single Product
router.get('/get-product/:slug', singleProductController);

// Get  Product Photo
router.get('/product-photo/:pid', productPhotoController);


//Delete Product
router.delete('/delete-product/:pid', deleteProductController);


//Filters Product
router.post('/product-filters', productFiltersController);

//Product Counts
router.get('/product-count', productCountController);

// Product per page
router.get('/product-list/:page', productListController);

// Search Product
router.get('/search/:keyword', searchProductController);

// Similar Product
router.get('/related-product/:pid/:cid', relatedProductController);


// Category wise Product
router.get('/product-category/:slug', productCategoryController);

//Payment Router
//token
router.get('/braintree/token', braintreeTokenController);



//Payment
router.post('/braintree/payment', requireSignIn, braintreePaymentController);

export default router