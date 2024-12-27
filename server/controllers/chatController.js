import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"







export const createNewChat = async (req, res) => {
    try {
        const members = req.body
        // console.log(members)
        const chat = new chatModel(members)
        const savedChat = await (await (await chat.save()).populate('members')).populate('lastMessage')

        res.status(201).json({
            message: "Chat created successfully",
            success: true,
            data: savedChat
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}




export const getAllChats = async (req, res) => {
    try {
        const userId = req.body.userId
        if(!userId){
            return res.status(400).json({
                message: "Failed to get the logged in user Id to get all chats",
                success: false
            })
        }
        const allChat = await chatModel.find({
            members: {
                $in: userId
            }
        }).populate('members').populate("lastMessage").sort({updatedAt: -1})

        res.status(200).json({
            message: "All chat fetched successfully",
            data: allChat,
            success: true
        })


    } catch (error) {
        res.status(400).json({
            message: "Failed to get all chats",
            success: false
        })

    }
}



export const clearUnreadMessage = async (req, res) => {
    try {
    const chatId = req.body.chatId

    // update the unread message count in the chat collection 
    const chat = await chatModel.findById(chatId)
    if(!chat){
        res.status(404).res({
            message: "No chat found with the given chatId",
            success: false
        })
    }
    const upDatedChat = await chatModel.findByIdAndUpdate(
        chatId,
        {unreadMessageCount: 0,
        },
       
        {new: true}
    ).populate('members').populate("lastMessage")
        

    await messageModel.updateMany(
        {
            chatId: chatId,
            read: false
        },
        {
            read: true
        }
    )
    
    res.status(200).json({
        message: "Cleared unread message count successfully",
        success: true,
        data: upDatedChat
    })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })

    }
}