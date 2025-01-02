import { useDispatch, useSelector } from "react-redux";
import ChatArea from "../../components/chatArea/ChatArea";
import Header from "../../components/header/Header";
import Searcher from "../../components/Searcher";
import SideBar from "../../components/SideBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { setSelectedChat } from "../../redux/features/chatSlice";
import { setAllMessages } from "../../redux/features/messageSlice";
import { socket } from "../../lib/utils";
import { setOnlineUsers } from "../../redux/features/userSlice";

const Home = () => {
	const { selectedChat,allChats } = useSelector((state) => state.chatSlice);
	const {userData } = useSelector((state) => state.userSlice);
	const dispatch = useDispatch();
	const { chatId } = useParams();
	const selectedChaiIdFromAllChats = allChats?.find(
		(chat) => chat?._id === chatId
	);
	
	useEffect(() => {
		if (chatId) {
			dispatch(
				setSelectedChat({ selectedChat: selectedChaiIdFromAllChats })
			);
		}else{
			dispatch(setAllMessages({allMessages:[]}))
		}
	}, [selectedChaiIdFromAllChats]);

    useEffect(()=>{
		if(userData?._id){

			socket.emit('join-room',userData?._id)
			socket.emit('user-connected',userData?._id)
            socket.on("online-users",(onlineUsers)=>{
				// console.log(onlineUsers)
				dispatch(
					setOnlineUsers({
						onlineUsers:onlineUsers
					})
				)
			})
			
		}
	},[userData,dispatch])


	return (
		<>
			<main className='flex w-full h-full gap-3   '>
				<div
					className={` sidebarContainer h-screen md:w-auto w-full ${
						selectedChat?._id && "hidden md:flex"
					}`}
				>
					<SideBar />
				</div>
				<div
					className={` h-screen  md:w-full flex justify-center items-center  ${
						selectedChat?._id && " w-full"
					} chatAreaContainer  md:flex `}
				>
					{selectedChat?._id ? (
						<ChatArea />
					) : (
						<div className=' text-4xl text-muted-foreground  w-full h-full md:flex justify-center items-center hidden'>
							No selected chat 🤔
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default Home;
