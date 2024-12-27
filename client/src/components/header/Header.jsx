import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useSelector } from "react-redux";

const Header = () => {
	const {selectedChat} = useSelector(state=>state.chatSlice)
	return (
		<header className={` rounded-b-lg bg-primary/10 backdrop-blur-md h-16 w-full flex justify-between px-3 p-2 ${selectedChat?._id && "hidden md:flex"}`}>
			
			<div className='left'>
				<Link to={"/"} className='logo logo-color text-3xl font-bold '>
					Messenger
				</Link>
			</div>
			<div className='right'>
				<ProfileDropdown />
			</div>
		</header>
	);
};

export default Header;
