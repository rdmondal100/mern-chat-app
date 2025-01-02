import { toast } from "react-toastify";
import { createNewChat } from "../services/chatService";
import { setAllChats, setSelectedChat } from "../redux/features/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export const useChatHandlers = () => {
	const { allChats, selectedChat } = useSelector((state) => state.chatSlice);
    const { allUsersData, userData, onlineUsers } = useSelector(
		(state) => state.userSlice
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

    const handleStartChat = async (sender, reciver,setSearchKey,setIsFocused) => {
		const startChatToast = toast.loading("Trying to start chat");
		const members = [sender?._id, reciver?._id];
		try {
			if (members?.length > 1) {
				const response = await createNewChat(members);

				if (response.success) {
					// console.log(allChats);
					const newChat = response?.data;
					// console.log("New chat logged");
					// console.log(newChat);
					const newAllChats = [...allChats, newChat];
					// console.log(newAllChats);
					dispatch(setAllChats({ allChats: newAllChats }));
					dispatch(setSelectedChat({ selectedChat: newChat }));
					navigate(`/chat/${newChat?._id}`);

					setSearchKey("");
					setIsFocused(false);
					toast.update(startChatToast, {
						render: `Successfully start chat with ${reciver?.firstname}`,
						type: "success",
						isLoading: false,
						autoClose: 3000,
					});
				} else {
					throw new Error("Failed to creat new chat, Try again");
				}
			}
		} catch (error) {
			console.log(error);
			toast.update(startChatToast, {
				render: error.message,
				type: "error",
				isLoading: false,
				autoClose: 3000,
			});
		}
	};

	const handleOpenChat = async (selectedUserId) => {
		try {
			// console.log(selectedUserId);
			const chat = allChats.find(
				(chat) =>
					chat?.members
						.map((m) => m?._id)
						?.includes(selectedUserId) &&
					chat?.members.map((m) => m?._id)?.includes(userData?._id)
			);

			if (chat) {
				if (chat?._id === selectedChat?._id) {
					console.log("Already selected");
					return;
				}
				dispatch(setSelectedChat({ selectedChat: chat }));
				navigate(`/chat/${chat?._id}`);
			} else {
				throw new Error("Failed to open the chat, Please try agian");
			}
		} catch (error) {
			toast.error(error?.message || "Something went wrong, Try again");
			console.log(error);
		}
	};

	return {handleOpenChat,handleStartChat};
};

export default useChatHandlers;
