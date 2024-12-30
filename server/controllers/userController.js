import {deleteFromCloudinary, uploadOnCloudinary} from "../cloudinary/cloudinary.js"
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
        const {userId} = req.body
        const imagePath = req.file?.path
        let oldProfilePic = null
        if (imagePath) { 
            const userById= await userModel.findById({_id:userId})
            if(userById?.profilePic){
                oldProfilePic = userById?.profilePic
            }
            console.log("Old Profile pic",oldProfilePic)

            const profilePic = await uploadOnCloudinary(imagePath)
            console.log(profilePic)
            console.log(userId)

            if (profilePic?.url && userId) {

                if(oldProfilePic){
                    const deletedOldPic = await deleteFromCloudinary(oldProfilePic)
                    console.log("Deleted profile pic::",deletedOldPic)
                }
                const userByUserId = await userModel.findOneAndUpdate({_id:userId},{
                    profilePic:profilePic?.url
                },{new:true})

                console.log(userByUserId)

                res.status(200).json({
                    message: "Profile picture upload successfully",
                    success:true,
                    data: userByUserId,
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