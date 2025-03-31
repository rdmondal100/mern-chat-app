import MessageSender from "./MessageSender";
import MessageAreaChatHeader from "./MessageAreaChatHeader";
import MessageArea from "./MessageArea";

const ChatArea = () => {

	return (
		<div className=' chatArea h-screen   w-full flex flex-col relative    rounded-lg bg-card md:mr-2'>
			<MessageAreaChatHeader />
			<div
				className='messageArea  h-[calc(100%-3rem)] '
			>
				<MessageArea />
			</div>
			<div className='messageSender bottom-0 bg-muted   p-2 border-t-2 border-border rounded-b-lg fixed  md:absolute w-full  '>
				<MessageSender />
			</div>
		</div>
	);
};

export default ChatArea;
