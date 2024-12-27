import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    chatId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    text:{
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false,

    }
}, { timestamps: true })




const messageModel = mongoose.model("Message",messageSchema)

export default messageModel