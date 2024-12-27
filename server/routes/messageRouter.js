import { Router } from "express";
import verifyJWT from "../middleware/verifyJWTMiddleWare.js";
import { createNewMessage, getAllMessages } from "../controllers/messageController.js";



const messageRouter = Router()


messageRouter.post("/create-new-message",verifyJWT,createNewMessage)

messageRouter.get("/get-all-message/:chatId",verifyJWT,getAllMessages)








export default messageRouter