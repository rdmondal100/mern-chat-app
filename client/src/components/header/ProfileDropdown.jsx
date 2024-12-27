import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/userSlice";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useState } from "react";
import { getAvatarName, getFullname } from "../../lib/avatarInfo";
import { socket } from "../../lib/utils";

const ProfileDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { userData } = useSelector((state) => state.userSlice);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		const logoutToast = toast.loading("Trying to log out");
		try {
			const response = await logOutUser();
			if (response.success) {
				socket.emit("user-disconnected",userData?._id)
				dispatch(
					setUser({
						status: "unAuthenticated",
						isAuthenticated: false,
						userData: null,
						onlineUsers:[]
					})
				);
				toast.update(logoutToast, {
					render: response?.message,
					type: "success",
					isLoading: false,
					autoClose: 3000,
				});
				navigate("/login");
			} else {
				throw new Error("Failed to log out, Please try again");
			}
		} catch (error) {
			console.log(error);
			toast.update(logoutToast, {
				render: error?.message || "Failed to log out, Please try again",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			});
		}
	};



	return (
		<DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
			<DropdownMenuTrigger className='relative ring-1 ring-ring rounded-full  bg-accent outline-none '>
				<Avatar className='w-12 h-12 '>
					<AvatarImage
						src={userData?.profilePic}
						alt={userData?.firstname}
						className=' bg-cover '
					/>
					<AvatarFallback className=' font-bold logo-color  '>
						{userData?.firstname && getAvatarName(userData)}
					</AvatarFallback>
				</Avatar>
				<div
					className={`drop absolute z-50 right-0 bottom-0  text-xl transition-transform duration-300 ease-linear ${
						isOpen ? " rotate-180" : "rotate-0"
					}`}
				>
					<IoMdArrowDropdownCircle
						className=' text-primary text-lg'
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{getFullname(userData)}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='transform duration-150 ease-linear cursor-pointer hover:font-bold hover:text-white hover:bg-primary'>
					Profile
				</DropdownMenuItem>

				<DropdownMenuSeparator />
				<DropdownMenuItem
					className=' transform duration-150 ease-linear cursor-pointer hover:font-bold hover:text-white bg-accent hover:bg-destructive'
					onClick={handleLogout}
				>
					<div className='logout'></div>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
