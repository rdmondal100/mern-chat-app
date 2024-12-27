import { useEffect, useState } from "react";
import { getAllMessage } from "../../services/messageService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { formatTimestamp } from "../../lib/formateTimestamp";
import { setAllMessages } from "../../redux/features/messageSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarName, getFullname } from "../../lib/avatarInfo";
import { clearUnreadMessageCount } from "../../services/chatService";
import { socket } from "../../lib/utils";
import store from "../../redux/store/store.js";
import { setAllChats } from "../../redux/features/chatSlice.js";
import { IoMdDoneAll } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa6";

const MessageArea = () => {
	// const [allMessages,setAllMessages] = useState()
	const [isTyping,setIsTyping] = useState(false)
	const { selectedChat, allChats } = useSelector((state) => state.chatSlice);
	const { userData } = useSelector((state) => state.userSlice);
	const { allMessages } = useSelector((state) => state.messageSlice);
	const dispatch = useDispatch();
	const chat = selectedChat?.members?.find((m) => m?._id !== userData?._id);

	const fetchAllMessages = async () => {
		try {
			const response = await getAllMessage(selectedChat?._id);
			if (response?.success) {
				console.log(response.data);
				dispatch(setAllMessages({ allMessages: response?.data }));
			}
		} catch (error) {
			toast.error(
				error.message || "Failed to get all message, Please reload"
			);
		}
	};

	const clearUnreadMessageCountIndb = async (message) => {
		try {
			socket.emit("clear-unread-message", {
				chatId: selectedChat?._id,
				members: selectedChat?.members?.map((m) => m._id),
				message:message
			});
			const response = await clearUnreadMessageCount(selectedChat?._id);
			console.log(response)
			if (response?.success) {
				allChats.map((chat) => {
					if (chat?._id === selectedChat?._id) {
						return response?.data;
					}
					return chat;
				});
			}
			// console.log(allChats)
		} catch (error) {
			toast.error(
				error.message || "Failed to clear unread message count"
			);
		}
	};

	useEffect(() => {
		fetchAllMessages();

		if (selectedChat?.lastMessage?.sender !== userData?._id) {
			console.log("Clearing the message count");
			clearUnreadMessageCountIndb(selectedChat?.lastMessage);
		}
	}, [selectedChat?._id]);

	useEffect(() => {
		socket.on("receive-message", (message) => {
			console.log(message);

			const selectedChat = store.getState().chatSlice.selectedChat;
			const allMessages = store.getState().messageSlice.allMessages;

			if (selectedChat?._id === message?.chatId) {
				console.log(allMessages);

				dispatch(
					setAllMessages({
						allMessages: [
							...allMessages,
							message,
						],
					})
				);
			}
			console.log(allMessages);
			if (selectedChat?._id === message?.chatId && message?.sender !== userData?._id) {
				console.log('trying to clear unread messages')
				clearUnreadMessageCountIndb(message);
			}
		});

		socket.on("message-count-cleared", (unreadMessage) => {
			const selectedChat = store.getState().chatSlice.selectedChat;
			const allChats = store.getState().chatSlice.allChats;
			const allMessages = store.getState().messageSlice.allMessages;
			console.log(unreadMessage)

			if (selectedChat?._id === unreadMessage.chatId) {
				const updatedChats = allChats?.map((chat) => {
					if (chat?._id === unreadMessage.chatId) {
						return { ...chat, unreadMessageCount: 0,lastMessage:unreadMessage.message };
					}

					return chat;
				});
				console.log(updatedChats)
				dispatch(
					setAllChats({
						allChats: updatedChats,
					})
				);
				const updatedMessages = allMessages.map((message) =>
					message.chatId === selectedChat?._id
						? { ...message, read: true }
						: message
				);

				console.log("updated message of selected chat",updatedMessages)
				dispatch(setAllMessages({ allMessages: updatedMessages }));
			}
		});

		let typingTimeout
		socket.on("typing-started",(typing)=>{
			console.log(typing?.members)
			console.log(userData?._id)
			const receiver =  (userData?._id !== typing?.sender) && (typing?.chatId === selectedChat?._id)
console.log(receiver)
			if(receiver){
					setIsTyping(true)
					
					clearTimeout(typingTimeout);

					typingTimeout = setTimeout(() => {
						setIsTyping(false);
					}, 2000);
				}
		})
	}, []);

	console.log(isTyping)

	return (
		<div className=' flex flex-col gap-3 py-5'>
			<div className=' w-full flex justify-center items-center flex-col mt-4 gap-2'>
				<Avatar className='w-20 h-20  bg-muted ring-1 ring-ring '>
					<AvatarImage
						src={chat?.profilePic}
						alt={chat?.firstname}
						className=' bg-cover '
					/>
					<AvatarFallback className=' font-bold logo-color text-3xl  '>
						{chat?.firstname && getAvatarName(chat)}
					</AvatarFallback>
				</Avatar>
				<h1 className='fullname text-2xl font-bold'>
					{getFullname(chat)}
				</h1>
				<button className=' bg-muted py-2 rounded-full text-[.75rem] font-bold px-4 my-4'>
					View profile
				</button>
			</div>
            <div className="message">
			{allMessages?.map((message, index) => {
				const isCurrentUserIsSender = message?.sender === userData?._id;

				return (
					<div key={index} className='py-1'>
						<div
							className={`w-full relative flex ${
								isCurrentUserIsSender
									? "justify-end"
									: "justify-start"
							} `}
						>
							<div
								className={`${
									isCurrentUserIsSender
										? "justify-end text-white"
										: "text-white"
								} message max-w-[calc(100%-100px)] whitespace-pre-wrap relative`}
							>
								<p
									className={`${
										isCurrentUserIsSender
											? "bg-primary rounded-bl-2xl"
											: "bg-muted-foreground rounded-br-2xl"
									} rounded-t-2xl px-4 py-2 relative  ${message?.text==="THUMBS_UP" && " text-4xl text-primary bg-transparent"}`}
								>
					{message.text==="THUMBS_UP"?(<FaThumbsUp/>):(message.text)}
									<span
										className={`${message?.text==="THUMBS_UP" && " hidden"} w-4 h-4 absolute rounded-tl-xl ${
											isCurrentUserIsSender
												? "bg-primary rounded-bl-full -rotate-[24deg] -bottom-1 -right-[.1rem]"
												: "-bottom-1 -left-[.1rem] bg-muted-foreground rotate-[25deg] rounded-tr-xl rounded-br-full"
										}`}
									></span>
								</p>

								<div className=' text-foreground w-full flex justify-end mt-1  items-center gap-2'>
									<small
										className={`text-xs text-gray-600 relative  ${
											isCurrentUserIsSender
												? "float-left ml-2"
												: "float-right mr-2"
										}`}
									>
										{formatTimestamp(message.createdAt)}
									</small>
									<div className='statusDone'>
										{isCurrentUserIsSender &&
											(message?.read ? (
												<IoMdDoneAll className=' text-primary' />
											) : (
												<MdDone className=' text-muted-foreground' />
											))}
									</div>
								</div>
							</div>
						</div>
						{/* {(message?.msgId === lastReadMessage && message?.sender !== userData._id) && (
                <Avatar className='w-5 h-5 bg-muted ring-1 ring-ring block float-right relative'>
                    <AvatarImage
                        src={chat?.profilePic}
                        alt={chat?.firstname}
                        className='bg-cover'
                    />
                    <AvatarFallback className='font-bold logo-color text-[.6rem]'>
                        {chat?.firstname && getAvatarName(chat)}
                    </AvatarFallback>
                </Avatar>
            )} */}
					</div>
				);
			})}

			{/* indicator  */}
{			
			<div className={` ${isTyping && " translate-x-0"} transition-all duration-200 ease-linear -translate-x-[100px] bg-muted-foreground w-14 h-8 rounded-xl typing-indicator pt-4 relative overflow-visible z-10 mt-4`}>
				<span className='dot  bg-primary w-[.4rem] h-[.4rem] flex justify-center items-center rounded-full ring-1 ring-white'></span>
				<span className='dot bg-primary w-[.4rem] h-[.4rem] flex justify-center items-center rounded-full ring-1 ring-white'></span>
				<span className='dot bg-primary w-[.4rem] h-[.4rem] flex justify-center items-center rounded-full ring-1 ring-white'></span>
			<span
										className={ ` w-4 h-4 absolute rounded-tl-xl  "-bottom-1 -left-[.2rem] bg-muted-foreground rotate-[28deg] rounded-tr-xl rounded-br-full -z-[1] "
										`}
									></span>
			</div>
}			
			</div>
		</div>
	);
};

export default MessageArea;
