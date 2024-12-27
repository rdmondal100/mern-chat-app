import { useState } from "react";
import Searcher from "./Searcher";
import UsersList from "./usersList";
import Header from "./header/Header";

const SideBar = () => {
	const [searchKey, setSearchKey] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	// console.log(searchKey);

	return (
		<div className=' flex flex-col gap-2  h-[95vh]   md:min-w-[380px] lg:min-w-[400px]    md:max-w-[420px] p-2 '>
			<Header />
			<div className=' ml-2 w-full  bg-muted border-r-2 border-border  rounded-lg   relative  h-full  p-2'>
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

				<div className='userList relative overflow-y-auto h-full  max-h-[calc(88vh-100px)] py-4'>
					<UsersList
						className=' '
						searchKey={searchKey}
						setSearchKey={setSearchKey}
						setIsFocused={setIsFocused}
						isFocused={isFocused}
					/>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
