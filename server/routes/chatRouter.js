import { Router } from "express";
import verifyJWT from "../middleware/verifyJWTMiddleWare.js";
import { clearUnreadMessage, createNewChat, getAllChats } from "../controllers/chatController.js";



const chatRouter = Router()


chatRouter.post("/create-new-chat",verifyJWT,createNewChat)
chatRouter.get("/get-all-chat",verifyJWT,getAllChats)
chatRouter.post("/clear-unread-message",verifyJWT,clearUnreadMessage)











export default chatRouter