import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"





export const createNewMessage = async (req, res) => {
    try {
        //store the message
        // console.log(req.body)
        const newMessage = new messageModel(req.body)
        const savedMessage = await newMessage.save()


        //update the last message in the chat collection
        const chatId = req.body.chatId
        // console.log(chatId)
        // const currentChat = await chatModel.findById(chatId)
        // console.log(currentChat)
        // currentChat.lastMessage = savedMessage._id
        // await currentChat.save()
        await chatModel.findOneAndUpdate({
            _id: chatId

        }, {
            lastMessage: savedMessage._id,
            $inc: {
                unreadMessageCount: 1
            }
        })

        res.status(201).json({
            message: "Message send successfully",
            success: true,
            data: savedMessage
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })

    }
}




export const getAllMessages = async(req,res)=>{
    try {
        // console.log(req.params.chatId)
        const allMessages = await messageModel.find({
            chatId: req.params.chatId
        }).sort({
            createdAt:1
        })

        res.status(200).json({
            message: "All message fetched successfully",
            success: true,
            data : allMessages
        })
    } catch (error) {
res.status(400).json({
    message: error.message,
    success: false
})
    }
}