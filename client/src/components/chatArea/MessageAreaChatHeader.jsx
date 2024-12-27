import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { setSelectedChat } from "../../redux/features/chatSlice";
import { getAvatarName, getFullname } from "../../lib/avatarInfo";
const MessageAreaChatHeader = () => {
	const { userData } = useSelector((state) => state.userSlice);
	const {  selectedChat } = useSelector((state) => state.chatSlice);

	// console.log(selectedChat)
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const chat = selectedChat?.members?.find((m) => m?._id === userData?._id);
	const otherMember = selectedChat?.members?.find((m) => m?._id !== userData?._id);
	



	
	return (
		<div className='chatheader h-16  bg-muted flex items-center py-1  px-2  backdrop-blur-sm border-b-2 border-b-border rounded-t-lg'>
			<IoChevronBackOutline
				className=' cursor-pointer mr-3 text-xl text-primary'
				onClick={() => {
					console.log("home");
					navigate("/");
					dispatch(setSelectedChat({ selectedChat: null }));
				}}
			/>
			<div className='avatar overflow-hidden  rounded-full min-w-12 max-w-12  ring-2 ring-ring'>
				<Avatar className='  w-12 h-12 bg-accent'>
					<AvatarImage
						src={otherMember?.profilePic}
						alt={otherMember?.firstname}
						className=' bg-cover '
					/>
					<AvatarFallback className=' font-bold logo-color  '>
						{otherMember?.firstname && getAvatarName(otherMember)}
					</AvatarFallback>
				</Avatar>
			</div>
			<div className='info ml-2'>
				<h1 className='name font-bold '>{getFullname(otherMember)}</h1>{" "}
				<div className='email  text-sm text-muted-foreground'>
					{otherMember?.email}
				</div>
			</div>
		</div>
	);
};

export default MessageAreaChatHeader;
