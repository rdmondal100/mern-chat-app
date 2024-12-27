import MessageSender from "./MessageSender";
import MessageAreaChatHeader from "./MessageAreaChatHeader";
import MessageArea from "./MessageArea";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ChatArea = () => {
	const messageAreaContainer = useRef(null);
	const { allMessages } = useSelector((state) => state.messageSlice);
	
	useEffect(() => {
		if (messageAreaContainer.current) {
			messageAreaContainer.current.scrollTop = messageAreaContainer.current.scrollHeight 
		}
	}, [allMessages]);
	return (
		<div className=' chatArea h-screen md:h-[95vh]  w-full flex flex-col    rounded-lg bg-card md:mr-2'>
			<MessageAreaChatHeader />
			<div
				className='messageArea  h-full px-3 overflow-auto bg-background'
				ref={messageAreaContainer}
			>
				<MessageArea />
			</div>
			<div className='messageSender bottom-0 bg-muted  h-auto   p-2 border-t-2 border-border rounded-b-lg '>
				<MessageSender />
			</div>
		</div>
	);
};

export default ChatArea;
