import { axiosInstance } from "../lib/utils"





export const createNewMessage = async (message) => {

    try {
        const response = await axiosInstance.post("/api/message/create-new-message", message, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Include cookies
        })
        // console.log("Create new message", response)
        return response.data
    } catch (error) {
        return error.response

    }
}


export const getAllMessage = async (chatId) => {

    try {
        const response = await axiosInstance.get(`/api/message/get-all-message/${chatId}`, { withCredentials: true })
        // console.log(response)
        return response.data
    } catch (error) {
        return error.response

    }
}