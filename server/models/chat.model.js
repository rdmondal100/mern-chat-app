import mongoose, { Schema } from "mongoose";


const chatSchema = new Schema({
    members: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    unreadMessageCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true })



const chatModel = mongoose.model("Chat",chatSchema)

export default chatModel