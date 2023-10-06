import express from 'express';
import { loginController, registerController, testController, forgotPasswardController, updateProfileController, getOrderController, getAllOrderController, orderStatusController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


// Creating object
const router = express.Router();

// Routing

// REGISTER || POST METHOD
router.post('/register', registerController);

// LOGIN || POST METHOD
router.post('/login', loginController);

// FORGOT PASSWORD || POST 
router.post('/forgot-password', forgotPasswardController)


// TEST || GET METHOD
router.get('/test', requireSignIn, testController);

// protected route-auth || GET METHOD
router.get('/user-auth', requireSignIn, (req, res) => {
    res.send({ ok: true });
});

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.send({ ok: true });
});

// Update profile
router.put('/profile', requireSignIn, updateProfileController)

// Orders
router.get('/orders', requireSignIn, getOrderController);

// All - Admin Orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrderController);

// Update orders Status
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

export default router