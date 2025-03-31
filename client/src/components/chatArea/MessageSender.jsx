import { IoSend } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewMessage } from "../../services/messageService";
import { setAllMessages } from "../../redux/features/messageSlice";
import { currentTime, socket } from "../../lib/utils";
import { nanoid } from "@reduxjs/toolkit";
import { setAllChats, setSelectedChat } from "../../redux/features/chatSlice";
import { FaThumbsUp } from "react-icons/fa6";

const MessageSender = () => {
	const { userData } = useSelector((state) => state.userSlice);
	const { selectedChat, allChats } = useSelector((state) => state.chatSlice);
	const { allMessages } = useSelector((state) => state.messageSlice);
	const [message, setMessage] = useState("");
	const [isPlaceHolder, setIsPlaceHolder] = useState(true);
	const messageInputRef = useRef(null);
	const dispatch = useDispatch();

	const sendMessage = async (msg) => {
		try {
			console.log(msg)
			if (msg.trim()) {
				console.log(msg,"send like")
				const neMessage = {
					chatId: selectedChat?._id,
					sender: userData?._id,
					text: msg,
				};
				socket.emit("send-message", {
					...neMessage,
					members: selectedChat?.members.map((m) => m?._id),
					read: false,
					createdAt: currentTime(),
				});

				const response = await createNewMessage(neMessage);
				if (response?.success) {
					console.log(response);
					console.log(selectedChat);
					
					setMessage("");
					const updatedSelectedChat = {...selectedChat,lastMessage:response?.data}
					console.log("The updated selected chat:::->>>",updatedSelectedChat)
					dispatch(setSelectedChat({
						selectedChat:updatedSelectedChat
					}))
					
					if (messageInputRef.current) {
						messageInputRef.current.innerText = "";
					}
					setIsPlaceHolder(true);
				}
				console.log(selectedChat);
			}
		} catch (error) {
			console.log(error);
		}finally{
			setMessage("")
		}
	};
	const handleInput = (e) => {
		
		socket.emit("user-typing",{
			chatId: selectedChat?._id,
			members: selectedChat?.members?.map(m=>m?._id),
			sender: userData?._id
		})

		const text = String(e.target.innerText).trim();
		const textBoxHtml = e.target.innerHTML;

		const isEmpty = text === "" && 
		(textBoxHtml === "" || textBoxHtml === "<br>" || textBoxHtml === "<br><br>");
		console.log(isEmpty)
setIsPlaceHolder(isEmpty);
	
		if (text) {
			setMessage(text);
				console.log("text:",text)
		} else {
			setMessage(text);
			console.log("text:",text)
		}
	};

	

	return (
		<div className=' w-full px-2 h-auto'>
			<div className='flex w-full  items-center space-x-5 '>
				<div className=' relative wrapper pl-2 w-full px-1 ring-1 rounded-xl bg-input  '>
					{isPlaceHolder && (
						<span className=' absolute left-3 pointer-events-none top-3 text-sm'>
							Aa
						</span>
					)}
					<div
						contentEditable='true'
						spellCheck='true'
						role='textbox'
						ref={messageInputRef}
						onInput={handleInput}
						aria-placeholder='Aa'
						className=' messageInputText   w-full  right-1 focus:outline-none max-h-32 overflow-auto relative h-auto bottom-0 min-h-12 p-2 	'
					></div>
				{console.log(message)}
				
				
				</div>
				{message.trim() ?(<IoSend
					role='button'
					type='submit'
					className=' cursor-pointer text-2xl text-primary'
					onClick={()=>sendMessage(message)}
				/>):(
				<FaThumbsUp
				onClick={()=>{
					sendMessage("THUMBS_UP")
					console.log(message)
				}}
				className=" text-primary text-3xl cursor-pointer"/>)}
			</div>
		</div>
	);
};

export default MessageSender;
