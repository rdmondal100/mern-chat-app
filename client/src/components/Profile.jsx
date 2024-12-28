import { useSelector } from "react-redux";
import { getAvatarName, getFullname } from "../lib/avatarInfo";
import { formatTimestamp } from "../lib/formateTimestamp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCamera } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const Profile = () => {
	const { userData } = useSelector((state) => state.userSlice);
	const navigate = useNavigate();
	const [image, setImage] = useState("");
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [showProfilePic, setShowProfilePic] = useState(false);

	const onFileSelect = async (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = async () => {
			setImage(reader.result);
			setPopoverOpen(false);
		};
	};

	return (
		<div className='profile w-[100vw] h-[100vh] relative'>
			<div className='wrapper md:pt-10 py-10 flex flex-col md:flex-row md:gap-10 md:justify-center'>
				<div className='profilePic-container md:w-auto w-full flex justify-center items-center relative h-auto'>
					<div className='profilePic relative'>
						<Avatar className='w-32 h-32 ring-1 shadow-lg'>
							<AvatarImage
								src={image || userData?.profilePic}
								alt={userData?.firstname}
								className='bg-cover'
							/>
							<AvatarFallback className='font-bold logo-color text-4xl'>
								{userData?.firstname && getAvatarName(userData)}
							</AvatarFallback>
						</Avatar>
						<span className='absolute p-1 right-0 border-2 bg-background rounded-full bottom-5 flex justify-center items-center ring-1'>
							<Popover
								className='rounded-full'
								open={popoverOpen}
								onOpenChange={setPopoverOpen}
							>
								<PopoverTrigger>
									<FaCamera className='text-xl' />
								</PopoverTrigger>
								<PopoverContent className='flex flex-col gap-3'>
									<div className='inputPinture relative'>
										<label
											htmlFor='fileInput'
											className='cursor-pointer font-semibold'
										>
											Choose from Gallery
										</label>
										<input
											type='file'
											id='fileInput'
											aria-label='Upload Profile Picture'
											className='hidden'
											onChange={onFileSelect}
										/>
									</div>
									<div
										className='viewProfilepic border-t-2 cursor-pointer font-semibold'
										onClick={() => {
											setPopoverOpen(false);
											setShowProfilePic(true);
										}}
									>
										View Profile Picture
									</div>
								</PopoverContent>
							</Popover>
						</span>
					</div>
				</div>
				<div className='details py-5 flex flex-col gap-2'>
					<h1 className='name text-3xl font-bold text-center'>
						{getFullname(userData)}
					</h1>
					<div className='email text-xl md:text-left text-center text-muted-foreground'>
						{userData?.email}
					</div>
					<div className='md:text-left createdAt text-center text-muted-foreground'>
						{formatTimestamp(userData?.createdAt)}
					</div>
				</div>
			</div>
			<span className='absolute top-5 left-2'>
				<IoChevronBackOutline
					className='cursor-pointer text-3xl md:text-4xl text-primary'
					onClick={() => navigate("/")}
				/>
			</span>

			{showProfilePic && (
				<div
					className='fullscreenPicture fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center'
					onClick={() => setShowProfilePic(false)}
				>
					<div className='relative'>
						<button
							className='absolute top-3 right-3 text-white bg-black/50 px-4 py-2 rounded-full hover:bg-black/80  font-semibold'
							onClick={() => setShowProfilePic(false)}
						>
							Close
						</button>
						<img
							src={image || userData?.profilePic}
							alt='Profile'
							className='max-w-full max-h-[90vh] rounded-xl shadow-lg p-1'
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
