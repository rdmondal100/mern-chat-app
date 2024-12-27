import axios from "axios"



export const getLoggedInUserData = async ()=>{
    try {
        const response = await axios.get('/api/user/get-logged-user',{ withCredentials: true })

        console.log(response.data)
        return response.data
    } catch (error) {
        return error.response
    }
}
export const getAllUsers= async ()=>{
    try {
        const response = await axios.get('/api/user/get-all-users',{ withCredentials: true })

        console.log(response.data)
        return response.data
    } catch (error) {
        return error.response
    }
}