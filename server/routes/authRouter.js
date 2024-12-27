import { Router } from "express"
import {logOutUser, registerUser} from "../controllers/authController.js"
import {loginUser} from "../controllers/authController.js"


const authRouter = Router()

authRouter.post('/signup',registerUser)
authRouter.post('/login',loginUser)
authRouter.post('/logout',logOutUser)



export default authRouter