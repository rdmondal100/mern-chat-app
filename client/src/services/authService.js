import { axiosInstance } from "../lib/utils"


export const signUpUser = async (user) => {
    try {
        const response = await axiosInstance.post("/api/auth/signup", user)
        return response.data

    } catch (error) {
        console.log("Error on signUpUser:::", error)
        return error.response
    }
}



export const loginUser = async (user) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', user)
        return response.data
    } catch (error) {
        return error.response

    }
}

export const logOutUser = async () => {
    try {
        const response = await axiosInstance.post('/api/auth/logout',)
        return response.data
    } catch (error) {
        return error.response

    }
}