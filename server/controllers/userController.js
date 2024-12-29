import uploadOnCloudinary from "../cloudinary/cloudinary.js"
import userModel from "../models/user.model.js"


export const getLoggedUser = async (req, res) => {
    try {
        const userId = req.body.userId
        const currentLoggedInUser = await userModel.findById({ _id: userId })
        if (!currentLoggedInUser) {
            return res.status(400).json({
                message: "Failed to get currentLoggedInUser::",
                success: false
            })
        }

        res.status(200).json({
            message: "Get currently loggedInUser successfully",
            success: true,
            data: currentLoggedInUser
        })

    } catch (error) {
        res.status(400).json({
            message: "Failed to get the logged in user",
            success: false
        })
    }
}



export const getAllUsers = async (req, res) => {
    try {
        const currentUserId = req.body.userId
        const allusers = await userModel.find({
            _id: {
                $ne: currentUserId
            }
        })
        // console.log(allusers)
        if (!allusers.length) {
            return res
                .status(404)
                .json({
                    message: "No user found",
                    success: false
                })
        }
        res
            .status(200)
            .json({
                message: "Get all users successfully",
                data: allusers,
                success: true
            })
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
}


export const uploadProfilePic = async (req, res) => {
    try {
        // console.log(req)
        const imagePath = req.file?.path
        if (imagePath) { 
            const profilePic = await uploadOnCloudinary(imagePath)
            console.log(profilePic)
            if (profilePic) {
                res.status(200).json({
                    message: "Profile picture upload successfully",
                    data: profilePic,
                })
            }else{
                res.status(400).json({
                    message: "Failed to upload profile picture, Please try again",
                    success: false
                })
            }
        }

    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
}