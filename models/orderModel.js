import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    buyer:{
        type: mongoose.ObjectId,
        ref: 'user'
    },
    products: [
        {
            type: mongoose.ObjectId,
            ref: 'Products'
        },
    ],
    payment: {},
    status:{
        type: String,
        default: 'Not Process',
        enum:['Not Process', 'Processing', 'Shipping', 'Deliverd', 'Cancel']
    }
},{timestamps:true});

export default mongoose.model('Order', orderSchema);