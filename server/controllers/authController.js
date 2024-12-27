
import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'



//register User
export const registerUser = async (req, res) => {
    try {
        // check if the user is already exists
        const { firstname, lastname, email, password, } = req.body

        const userByEmail = await userModel.findOne({ email })

        // if exists send error respon
        if (userByEmail) {
            return res.status(403).json({
                message: "User already exists with the email",
                success: false
            })
        }

        // encrypt the pass 
        const hashedPassword = await bcrypt.hash(password, 10)
        //  create new user and save in db 
        const newUser = new userModel({
            firstname, lastname, email, password: hashedPassword,
        })
        await newUser.save()

        res.status(201).json({
            message: "User created successfully",
            success: true
        })

    } catch (error) {
        console.log("Failed to registed user::",error)
        res.status(400).json({
            message: error?.message || "An unexpected error occured, Please try again",
            success: false
        })
    }
}



//login user

export const loginUser = async (req,res)=>{
try {
        const {email,password} = req.body
        // console.log(email,password)
        //Check if user exists with the email
        const userByEmail = await userModel.findOne({email}).select("+password")
        if(!userByEmail){
            return res.status(404).json({
                message: "User does not exist",
                success: false,
            })
        }
        // console.log(userByEmail)

        // check if the password is correct
        const isPasswordCorrect = await userByEmail.isPasswordCorrect(password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        }

        // if the user exists and password is correct assign a jwt
        const token = userByEmail.generateAccessToken()
        userByEmail.password = undefined
        // set the cookie
        const options = {
            httpOnly : true,
            secure: true
        }
        res
        .status(200)
        .cookie("accessToken",token,options)
        .json({
            message:"User logged in successfully",
            success: true,
            data: {user:userByEmail},
            token: token,
        })
    
} catch (error) {
    console.log("FAiled to login the user::",error)
    res.status(400).json({
        message: error.message,
        success: false
    })
}   
}



//logout user

export const logOutUser = async(req,res)=>{
    try {
        const token = undefined
        const options = {
            httpOnly : true,
            secure: true
        }
        res
        .status(200)
        .cookie("accessToken",token,options)
        .json({
            message:"User logged out successfully",
            success: true,
            data: null,
            token: token,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Failed to logOut"
        })
    }
}