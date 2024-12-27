import axios from "axios"


export const getAllChats = async (userId)=>{
    try {
        const response = await axios.get("/api/chat/get-all-chat",userId,{withCredentials:true})
        // console.log(response.data)
        return response.data
    } catch (error) {
        
        return error.response
    }
}


export const createNewChat = async (members)=>{
    try {
        const response = await axios.post("/api/chat/create-new-chat",{members},{withCredentials:true})
        // console.log(response.data)
        return response.data
    } catch (error) {
        
        return error.response
    }
}



export const clearUnreadMessageCount = async (chatId)=>{
    try {
        const response = await axios.post("/api/chat/clear-unread-message",{chatId},{withCredentials:true})
        // console.log(response.data)
        return response.data
    } catch (error) {
        
        return error.response
    }
}


