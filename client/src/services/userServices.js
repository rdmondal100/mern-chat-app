import axios from "axios"



export const getLoggedInUserData = async () => {
    try {
        const response = await axios.get('/api/user/get-logged-user', { withCredentials: true })

        console.log(response.data)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get('/api/user/get-all-users', { withCredentials: true })

        console.log(response.data)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const uploadProfilePic = async (formData) => {
    try {
        console.log(formData)
        const response = await axios.post('/api/user/upload-profile-pic', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'mulipart/form-data'
            }
        })

        console.log(response.data)
        return response.data
    } catch (error) {
        return error.response
    }
}