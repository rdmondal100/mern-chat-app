import { useState } from "react";
import Searcher from "./Searcher";
import UsersList from "./usersList";
import Header from "./header/Header";
import { useSelector } from "react-redux";
import FriendRequest from "./FriendRequest";

const SideBar = () => {
	const [searchKey, setSearchKey] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const { showRequests } = useSelector((state) => state.userSlice);
	// console.log(searchKey);

	return (
		<div className=' flex flex-col my-2    md:min-w-[380px] lg:min-w-[400px] h-[98vh]    md:max-w-[420px] p-x2 pt-2 ml-2 mt-2   bg-muted rounded-lg'>
			<Header />
			<div className=' pt-0 w-full  md:border-r-2 border-border     relative  h-full  px-2'>
				<Searcher
					searchKey={searchKey}
					setSearchKey={setSearchKey}
					isFocused={isFocused}
					setIsFocused={setIsFocused}
				/>
				{!searchKey && isFocused && (
					<p className=' text-center top-1/2 absolute text-muted-foreground text-xl  w-full'>
						Search by Name...
					</p>
				)}
				<hr className=' mt-2 text-primary h-[.15rem] rounded-full bg-border ' />

				<div className='userList relative overflow-y-scroll h-auto  max-h-[calc(90vh-100px)] pb-20 '>
					{showRequests ? (
						<FriendRequest />
					) : (
						<UsersList
							className=' '
							searchKey={searchKey}
							setSearchKey={setSearchKey}
							setIsFocused={setIsFocused}
							isFocused={isFocused}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default SideBar;
