import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { setShowRequests } from "../../redux/features/userSlice";
import { FaFacebookMessenger } from "react-icons/fa";
import { useEffect } from "react";

const Header = () => {
	const {selectedChat} = useSelector(state=>state.chatSlice)
	const dispatch = useDispatch()
	
	// useEffect(()=>{


	// },[showRequests])
	
	return (
		<header className={` backdrop-blur-md p-2  w-full flex justify-between   ${selectedChat?._id && "hidden md:flex"}`}>
			
			<div className='left'>
				<Link to={"/"} className='logo logo-color text-3xl font-bold '>
					Messenger
				</Link>
			</div>
			<div className="connect h-full flex justify-center items-center">
				<FaFacebookMessenger className=" text-4xl hover:text-white hover:bg-primary text-primary p-2 rounded-full cursor-pointer  transition-all duration-200 ease-linear" onClick={()=>dispatch(setShowRequests({showRequests:false}))}/>
			</div>
			<div className="connect h-full flex justify-center items-center">
				<FaUserPlus className=" text-4xl hover:text-white hover:bg-primary text-primary p-2 rounded-full cursor-pointer  transition-all duration-200 ease-linear"onClick={()=>dispatch(setShowRequests({showRequests:true}))}/>
			</div>
			<div className='right'>
				<ProfileDropdown />
			</div>
		</header>
	);
};

export default Header;
