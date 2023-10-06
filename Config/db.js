import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB DataBase ${conn}`);
        console.log("Connected Successful");
    } catch (error) {
        console.log(`error in MongoDB ${error}`);
    }
}

export default connectDB