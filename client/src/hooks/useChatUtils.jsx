import { useSelector } from "react-redux";
import { formatTimestamp } from "../lib/formateTimestamp";

const useChatUtils = () => {
	const { allChats } = useSelector((state) => state.chatSlice);
	const { userData } = useSelector((state) => state.userSlice);
	const handleGetLastMessage = (userId) => {
		if (!userId) {
			return "";
		}
		const chat = allChats.find((chat) =>
			chat?.members?.map((m) => m?._id).includes(userId)
		);
		if (!chat || !chat?.lastMessage) {
			return "";
		} else {
			const msgPrefix =
				chat?.lastMessage?.sender === userData?._id ? "You: " : "";
			if (chat?.lastMessage?.text === "THUMBS_UP") {
				return msgPrefix + "👍";
			}
			return msgPrefix + chat?.lastMessage?.text?.substring(0, 20);
		}
	};
	const handleGetLastMessageTimeStamps = (userId) => {
		const chat = allChats.find((chat) =>
			chat?.members?.map((m) => m?._id).includes(userId)
		);
		// console.log(chat);
		if (!chat || !chat?.lastMessage) {
			return "";
		} else {
			return formatTimestamp(chat?.lastMessage?.createdAt) || "";
		}
	};

	const handleGetUnReadMessageCount = (userId) => {
		const chat = allChats.find((chat) =>
			chat?.members?.map((m) => m?._id).includes(userId)
		);
		if (
			chat &&
			chat?.unreadMessageCount &&
			chat?.lastMessage?.sender === userId
		) {
			// console.log(chat?.unreadMessageCount);
			return chat?.unreadMessageCount;
		} else {
			return undefined;
		}
	};
	return { handleGetLastMessage, handleGetUnReadMessageCount, handleGetLastMessageTimeStamps };
};

export default useChatUtils;
