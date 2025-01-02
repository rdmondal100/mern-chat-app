import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

const Searcher = ({ setSearchKey, searchKey, setIsFocused, isFocused }) => {
	// console.log(isFocused);

	return (
		<div className=' w-full  px-2 flex  '>
			<div className={` relative flex justify-center gap-5 items-center w-full`}>
				<div
					className={`${
						isFocused && "w-[70%]"
					} w-full relative flex justify-center items-center transition-all duration-500 ease-linear`}
				>
					<Input
						className={`bg-input rounded-full h-10  pl-5 w-full`}
						placeholder='Search Messanger'
						value={searchKey}
						onChange={(e) => setSearchKey(e.target.value)}
						type='text'
						onFocus={() => setIsFocused(true)}
						
					/>
					<IoSearch className='absolute right-8 text-2xl text-primary' />
				</div>
				{isFocused && <button onClick={()=>{
					setIsFocused(false)
					setSearchKey("")
				}
					} className=' bg-transparent text-primary hover:bg-transparent transition-all duration-500 ease-linear font-bold'>Cancel </button>}
			</div>
			
		</div>
	);
};

export default Searcher;
