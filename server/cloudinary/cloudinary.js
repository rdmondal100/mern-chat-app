
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
                resource_type:'image'
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







