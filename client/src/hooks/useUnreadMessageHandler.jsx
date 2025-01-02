import { useSelector } from "react-redux";
import { socket } from "../lib/utils";
import { clearUnreadMessageCount } from "../services/chatService";
import { toast } from "react-toastify";


const useUnreadMessageHandler = () => {
	const { allChats, selectedChat } = useSelector((state) => state.chatSlice);

    const handleClearUnreadMessageCountIndb = async (message) => {
		try {
			socket.emit("clear-unread-message", {
				chatId: selectedChat?._id,
				members: selectedChat?.members?.map((m) => m._id),
				message: message,
			});
			const response = await clearUnreadMessageCount(selectedChat?._id);
			console.log(response);
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
	return {handleClearUnreadMessageCountIndb};
};

export default useUnreadMessageHandler;
