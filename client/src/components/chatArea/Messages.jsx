import { IoMdDoneAll } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { formatTimestamp } from "../../lib/formateTimestamp";
import { useDispatch, useSelector } from "react-redux";
import { setAllChats } from "../../redux/features/chatSlice";
import { setAllMessages } from "../../redux/features/messageSlice";
import { useEffect } from "react";
import { socket } from "../../lib/utils";
import store from "../../redux/store/store";

const Messages = ({ allMessages, clearUnreadMessageCountIndb }) => {
	const { userData } = useSelector((state) => state.userSlice);
	const dispatch = useDispatch();
	useEffect(() => {
		socket.on("receive-message", (message) => {
			console.log(message);

			const selectedChat = store.getState().chatSlice.selectedChat;

			
			if (selectedChat?._id === message?.chatId) {
				console.log(allMessages);

				dispatch(
					setAllMessages({
						allMessages: [
							...store.getState().messageSlice.allMessages,
							message,
						],
					})
				);

			}
			if (message?.sender !== userData?._id) {
				console.log("trying to clear the unread status");

					socket.emit('clear-unread-message',{
						unreadMessage:message
					})
				
			}
		});

		socket.on("message-count-cleared", (unreadMessage) => {
			const selectedChat = store.getState().chatSlice.selectedChat;
			const allChats = store.getState().chatSlice.allChats;
			const userData = store.getState().userSlice.userData;
			const allMessages = store.getState().messageSlice.allMessages;
			console.log(unreadMessage);

			if (selectedChat?._id === unreadMessage.chatId) {

				const updatedChats = allChats?.map((chat) =>
					chat._id === unreadMessage.chatId
						? { ...chat, unreadMessageCount: 0 }
						: chat
				);
				dispatch(setAllChats({ allChats: updatedChats }));

				const updatedMessages = allMessages.map((message) =>
					message.sender !== userData?._id
						? { ...message, read: true }
						: message
				);
				dispatch(setAllMessages({ allMessages: updatedMessages }));
			}
		});
	}, []);

	return (
		<div>
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
									} rounded-t-2xl px-4 py-2 relative`}
								>
									{message.text}
									<span
										className={`w-4 h-4 absolute rounded-tl-xl ${
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
											(message.read ? (
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
		</div>
	);
};

export default Messages;
