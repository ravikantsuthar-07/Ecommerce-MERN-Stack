import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js'
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        console.log(req.body);
        let { name, email, password, phone, address, question } = req.body;
        // Validation
        if (!name) {
            return res.send({ success: false, message: "Name is Require" })
        }
        if (!email) {
            return res.send({ success: false, message: "Email is Require" })
        }
        if (!password) {
            return res.send({ success: false, message: "Password is Require" })
        }
        if (!phone) {
            return res.send({ success: false, message: "Phone is Require" })
        }
        if (!address) {
            return res.send({ success: false, message: "Address is Require" })
        }
        if (!question) {
            return res.send({ success: false, message: "Answer is Require" })
        }
        //Check User
        const existingUser = await userModel.findOne({ email })
        // existing User
        if (existingUser) {
            return res.send({
                status: 200,
                success: false,
                message: "Already Register Please Login"
            })
        }

        // register user 
        const hashedPassword = await hashPassword(password);
        console.log(hashPassword);

        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, question }).save()

        res.send({
            status: 200,
            success: true,
            message: 'User Register Succesfully',
            user
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: 'Error in Registeration',
            error
        });
    }
}

// LOGIN CONTROLLER
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({
                status: 404,
                success: false,
                message: "Invaild email and password"
            });
        }

        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.send({
                status: 404,
                success: false,
                message: "Email is not registed"
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.send({
                status: 200,
                success: false,
                message: "Invalid Password"
            })
        }
        // Token
        const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '5d' });
        res.send({
            status: 200,
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
}

export const forgotPasswardController = async (req, res) => {
    try {
        const { email, question, newpassword } = req.body;
        if (!email) {
            return res.send({
                status: 400,
                message: "Email is required"
            })
        }
        if (!question) {
            return res.send({
                status: 400,
                message: "Question is required"
            })
        }
        if (!newpassword) {
            return res.send({
                status: 400,
                message: "New Password is required"
            })
        }

        //check
        const user = await userModel.findOne({ email, question })
        //validate
        if (!user) {
            return res.send({
                status: 404,
                success: false,
                message: "Wrong email and answer"
            })
        }

        const hashed = await hashPassword(newpassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        return res.send({
            status: 200,
            success: true,
            message: "Passward resert Successfully"
        })

    } catch (error) {
        console.log(error);
    }
}

export const testController = (req, res) => {
    res.send("Proted Routes")
};

// update profile

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || req.user.name,
            email: email || req.user.email,
            address: address || req.user.address,
            phone: phone || req.user.phone
        }, { new: true });
        res.status(200).send({
            success: true,
            message: 'Successfully Updated user',
            updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Updating Profile',
            error
        });
    }
};

export const getOrderController = async (req, res) => {
    try {
        const order = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name");
        res.json(order)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting order',
            error
        });
    }
};

export const getAllOrderController = async (req, res) => {
    try {
        const order = await orderModel.find({}).populate("products", "-photo").populate("buyer", "name").sort({ createdAt: "-1" });
        res.json(order)

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting order',
            error
        });
    }
};

export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, {status}, {new: true});
        res.json(order)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Updating status order',
            error
        });
    }
};