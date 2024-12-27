
import { Router } from "express";
import { getAllUsers, getLoggedUser } from "../controllers/userController.js";
import verifyJWT from "../middleware/verifyJWTMiddleWare.js";





const userRouter = Router()


userRouter.get('/get-logged-user',verifyJWT,getLoggedUser)
userRouter.get('/get-all-users',verifyJWT,getAllUsers)


export default userRouter