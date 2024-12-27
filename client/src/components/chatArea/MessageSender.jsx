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

					// console.log(selectedChat);
					// const updatedChats = allChats?.map((chat) => {
					// 	console.log(chat);
					// 	if (chat?._id === selectedChat?._id) {
					// 		return { ...chat, lastMessage: neMessage };
					// 	} else {
					// 		return chat;
					// 	}
					// });
					// dispatch(setAllChats({ allChats: updatedChats }));

					setMessage("");
					// const newMessageArray = [...allMessages, response?.data];
					// dispatch(setAllMessages({ allMessages: newMessageArray }));
					// console.log(response?.data);
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
		const text = e.target.innerText;
		if (text.trim()) {
			setMessage(text);
			setIsPlaceHolder(false);
		} else {
			setIsPlaceHolder(true);
			setMessage(text);

		}
	};

	

	return (
		<div className=' w-full px-2 h-auto'>
			<div className='flex w-full  items-center space-x-5 '>
				<div className=' relative wrapper w-full px-4'>
					{isPlaceHolder && (
						<span className=' absolute left-9 pointer-events-none top-2 text-sm'>
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
						className='bg-input ring-1 rounded-2xl w-full py-2 px-4 right-1 focus:outline-none max-h-32 overflow-auto '
					/>
				</div>
				{console.log(message)}
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
