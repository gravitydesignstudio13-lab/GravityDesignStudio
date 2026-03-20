import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
        const data=await mongoose.connect(process.env.Mongoose_key)
        console.log("db connected..")
    } catch (error) {
        console.log("error")
    }
}

export default connectDB