
import { Router } from "express";
import { getAllUsers, getLoggedUser, uploadProfilePic } from "../controllers/userController.js";
import verifyJWT from "../middleware/verifyJWTMiddleWare.js";
import { uploadSingle } from "../middleware/multerMiddleware.js";







const userRouter = Router()


userRouter.get('/get-logged-user',verifyJWT,getLoggedUser)
userRouter.get('/get-all-users',verifyJWT,getAllUsers)
userRouter.post('/upload-profile-pic',verifyJWT,uploadSingle,uploadProfilePic)

export default userRouter
