import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	clearUnreadMessageCount,
	createNewChat,
} from "../services/chatService";
import { setAllChats, setSelectedChat } from "../redux/features/chatSlice";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../lib/formateTimestamp";
import { getAvatarName, getFullname } from "../lib/avatarInfo";
import { useEffect } from "react";
import { socket } from "../lib/utils";
import store from "../redux/store/store";
import { setAllMessages } from "../redux/features/messageSlice";
import useChatHandlers from "../hooks/useChatHandlers";
import useChatUtils from "../hooks/useChatUtils";
import useUnreadMessageHandler from "../hooks/useUnreadMessageHandler";

const UsersList = ({ searchKey, isFocused, setSearchKey, setIsFocused }) => {
	const { allUsersData, userData, onlineUsers } = useSelector(
		(state) => state.userSlice
	);
	const { allChats, selectedChat } = useSelector((state) => state.chatSlice);

	const { handleOpenChat, handleStartChat } = useChatHandlers();
	const {
		handleGetLastMessage,
		handleGetLastMessageTimeStamps,
		handleGetUnReadMessageCount,
	} = useChatUtils();
	const { handleClearUnreadMessageCountIndb } = useUnreadMessageHandler();

	console.log(onlineUsers);
	const dispatch = useDispatch();

	const startChat = (sender, reciver) =>
		handleStartChat(sender, reciver, setSearchKey, setIsFocused);
	const openChat = (selectedUserId) => handleOpenChat(selectedUserId);
	const getLastMessage = (userId) => handleGetLastMessage(userId);
	const getLastMessageTimeStamps = (userId) =>
		handleGetLastMessageTimeStamps(userId);
	const getUnReadMessageCount = (userId) =>
		handleGetUnReadMessageCount(userId);
	const clearUnreadMessageCountIndb = (message) =>
		handleClearUnreadMessageCountIndb(message);

	const isSelected = (user) => {
		if (selectedChat) {
			return selectedChat?.members
				?.map((m) => m?._id)
				.includes(user?._id);
		} else {
			return false;
		}
	};

	useEffect(() => {
		if (
			selectedChat &&
			selectedChat?.lastMessage?.sender !== userData?._id
		) {
			console.log("Clearing the message count");
			clearUnreadMessageCountIndb(selectedChat?.lastMessage);
		}

		socket.off("receive-message").on("receive-message", (message) => {
			console.log(message);
			const selectedChat = store.getState().chatSlice.selectedChat;
			// console.log(selectedChat)
			let allChats = store.getState().chatSlice.allChats;
			// console.log(allChats)
			const allMessages = store.getState().messageSlice.allMessages;

			if (selectedChat?._id === message?.chatId) {
				console.log(allMessages);

				dispatch(
					setAllMessages({
						allMessages: [...allMessages, message],
					})
				);
			}

			if (
				selectedChat?._id === message?.chatId &&
				message?.sender !== userData?._id
			) {
				console.log("trying to clear unread messages");
				clearUnreadMessageCountIndb(message);
			}

			if (!selectedChat?._id || selectedChat?._id !== message?.chatId) {
				console.log(message, "Message recived by the sender");
				const updatedChats = allChats?.map((chat) => {
					if (chat?._id === message?.chatId) {
						return {
							...chat,
							unreadMessageCount: chat?.unreadMessageCount + 1,
							lastMessage: message,
						};
					}
					return chat;
				});
				allChats = updatedChats;
			} else {
				const updatedChats = allChats?.map((chat) => {
					if (chat?._id === message?.chatId) {
						return {
							...chat,
							unreadMessageCount: 0,
							lastMessage: message,
						};
					}
					return chat;
				});
				allChats = updatedChats;
			}

			console.log(allChats);
			const latestChat = allChats?.find(
				(chat) => chat?._id === message?.chatId
			);
			console.log(latestChat);
			const otherChats = allChats?.filter(
				(chat) => chat?._id !== message?.chatId
			);
			console.log(otherChats);
			allChats = [latestChat, ...otherChats];
			dispatch(setAllChats({ allChats: allChats }));
			// console.log(allChats);
		});

		// socket.off("receive-message").on("receive-message", (message) => {
		// 	console.log(message);
		// 	const selectedChat = store.getState().chatSlice.selectedChat;
		// 	// console.log(selectedChat)
		// 	let allChats = store.getState().chatSlice.allChats;
		// 	// console.log(allChats)
		// 	if (!selectedChat?._id || selectedChat?._id !== message?.chatId) {
		// 		console.log(message, "Message recived by the sender");
		// 		const updatedChats = allChats?.map((chat) => {
		// 			if (chat?._id === message?.chatId) {
		// 				return {
		// 					...chat,
		// 					unreadMessageCount: chat?.unreadMessageCount + 1,
		// 					lastMessage: message,
		// 				};
		// 			}
		// 			return chat;
		// 		});
		// 		allChats = updatedChats;
		// 	}else{
		// 		const updatedChats = allChats?.map((chat) => {
		// 			if (chat?._id === message?.chatId) {
		// 				return {
		// 					...chat,
		// 					unreadMessageCount: 0,
		// 					lastMessage: message,
		// 				};
		// 			}
		// 			return chat;
		// 		});
		// 		allChats = updatedChats;
		// 	}

		// 	console.log(allChats)
		// 	const latestChat = allChats?.find(
		// 		(chat) => chat?._id === message?.chatId
		// 	);
		// 	console.log(latestChat)
		// 	const otherChats = allChats?.filter(
		// 		(chat) => chat?._id !== message?.chatId
		// 	);
		// 	console.log(otherChats)
		// 	allChats = [latestChat, ...otherChats];
		// 	dispatch(setAllChats({ allChats: allChats }));
		// 	// console.log(allChats);
		// });
	}, [selectedChat?._id]);

	// console.log(allUsersData);

	const getUserChatList = !isFocused
		? allChats
		: allUsersData.filter(
				(user) =>
					searchKey &&
					(user?.firstname
						.toLowerCase()
						.includes(searchKey.toLowerCase()) ||
						user?.lastname
							.toLowerCase()
							.includes(searchKey.toLowerCase()))
		  );
	console.log(getUserChatList);
	return (
		<div className=' flex flex-col gap-4 user-chats-container'>
			{getUserChatList.length
				? getUserChatList?.map((item) => {
						let user = item;
						if (item?.members) {
							user = item?.members.find(
								(m) => m?._id !== userData?._id
							);
						}
						// console.log(user)
						return (
							user && (
								<div
									onClick={() => {
										const isAlreadyHasChat = allChats?.find(
											(chat) =>
												chat?.members
													.map((m) => m?._id)
													?.includes(user?._id)
										);
										if (isAlreadyHasChat) {
											openChat(user?._id);
										}
									}}
									key={user?._id}
									className={` relative cursor-pointer chat w-full flex gap-2 justify-between items-center  px-3 py-2 ${
										isSelected(user) &&
										" bg-primary  text-background duration-100 "
									} transition-all duration-75 ease-in-out  rounded-md group`}
								>
									<div className='details w-6/8 flex gap-4 justify-start'>
										<div
											className={` ${
												isSelected(user) && "bg-white"
											} avatar overflow-hidden bg-primary/20 rounded-full min-w-12 ${
												onlineUsers?.includes(
													user?._id
												) && "ring-2 ring-green-500  "
											} `}
										>
											{onlineUsers?.includes(
												user?._id
											) && (
												<span className=' absolute w-[.87rem] h-[.87rem] bottom-3 border-2 left-12 rounded-full z-50 bg-green-600'></span>
											)}
											<Avatar className='w-12 h-12'>
												<AvatarImage
													src={user?.profilePic}
													alt={user?.firstname}
													className=' bg-cover '
												/>
												<AvatarFallback className=' font-bold logo-color  '>
													{user?.firstname &&
														getAvatarName(user)}
												</AvatarFallback>
											</Avatar>
										</div>
										<div className='info flex flex-col w-4/6 text-ellipsis'>
											<h1 className=' block text-[1rem] font-bold w-full  text-ellipsis whitespace-nowrap'>
												{getFullname(user)}
											</h1>
											<span
												className={`${
													getUnReadMessageCount(
														user?._id
													) &&
													" text-foreground font-bold"
												} text-ellipsis w-full text-sm text-bg-accent whitespace-nowrap`}
											>
												{getLastMessage(user?._id)
													? getLastMessage(user?._id)
													: user?.email}
											</span>
										</div>
									</div>
									<div className='others w-2/8 h-full  float-right flex gap-1 items-center justify-between flex-col'>
										<div className=' flex text-[.6rem] '>
											{getLastMessageTimeStamps(
												user?._id
											)}
										</div>
										{getUnReadMessageCount(user?._id) && (
											<div className='unreadMessagecount bg-primary rounded-full text-[.7rem]  text-white font-bold w-5 h-5 flex justify-center items-center   '>
												<small className=' scale-125'>
													{getUnReadMessageCount(
														user?._id
													)}
												</small>
											</div>
										)}
									</div>
									{!allChats?.find((chat) =>
										chat?.members
											.map((m) => m?._id)
											?.includes(user?._id)
									) && (
										<button
											onClick={() =>
												startChat(userData, user)
											}
											className='action font-bold logo-color w-2/8 text-[.8rem]'
										>
											Start Chat
										</button>
									)}
								</div>
							)
						);
				  })
				: searchKey && (
						<span className=' text-center top-1/2 absolute w-full text-xl text-muted-foreground'>
							No chat found
						</span>
				  )}
		</div>
	);
};

export default UsersList;
