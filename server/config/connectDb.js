
import mongoose  from "mongoose";
import { MONGODB_NAME } from "../constant.js";

const connectDb =async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${MONGODB_NAME}`)
        // console.log(connectionInstance.connection)
        console.log("DB connection sucessfull")
        
    } catch (error) {
        console.log("DB connection failed",error)
        process.exit(1)
    }
}

export default connectDb