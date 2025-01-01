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
		<div className=' chatArea h-screen   w-full flex flex-col relative    rounded-lg bg-card md:mr-2'>
			<MessageAreaChatHeader />
			<div
				className='messageArea  h-full px-3 overflow-auto bg-background my-[50px]'
				ref={messageAreaContainer}
			>
				<MessageArea />
			</div>
			<div className='messageSender bottom-0 bg-muted  h-auto   p-2 border-t-2 border-border rounded-b-lg fixed  md:absolute w-full '>
				<MessageSender />
			</div>
		</div>
	);
};

export default ChatArea;
