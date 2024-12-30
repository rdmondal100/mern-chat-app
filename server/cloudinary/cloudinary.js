
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs/promises'
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,     
    api_secret: process.env.CLOUDINARY_API_SECRECT,
    secure: true
})


console.log(cloudinary.config())
console.log("cloudinary")


export const uploadOnCloudinary = async (localFilePath) =>{
    try {
        console.log(localFilePath)
        if(!localFilePath){
            console.log("Failed to get local file path")
            return null
        }
    
            const uploadResult = await cloudinary.uploader.upload(localFilePath,{
                resource_type:'image',
                folder:"mern-chat-app"
            })
            console.log(uploadResult)
            await fs.unlink(localFilePath)
            return uploadResult
        
    } catch (error) {
        await fs.unlink(localFilePath)
        console.log("Error uploaidng file",error)
        return null
    }
}


export const deleteFromCloudinary = async (fileLink) =>{
    try {
        console.log(fileLink)
        const publicId = fileLink.split("/").pop().split(".")[0];
        if(!publicId){
            console.log("FileLink is required")
            return null
        }
        const deletedFromCloudinary = await cloudinary.uploader.destroy(`mern-chat-app/${publicId}`)
        console.log("File deleted",deletedFromCloudinary)

        return deleteFromCloudinary
    } catch (error) {
        console.log("Failed to delete the file from cloudinary" , error)
        
    }
}






