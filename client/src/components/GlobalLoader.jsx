

const GlobalLoader = () => {
	return (
		<div className='flex items-center justify-center h-screen bg-black/60 -translate-x-[50%] left-1/2 top-1/2 -translate-y-[50%] w-full absolute'>
			<div className='typing-indicator'>
				<span className='dot  bg-primary w-4 h-4 flex justify-center items-center rounded-full ring-1 ring-white'></span>
				<span className='dot bg-primary w-4 h-4 flex justify-center items-center rounded-full ring-1 ring-white'></span>
				<span className='dot bg-primary w-4 h-4 flex justify-center items-center rounded-full ring-1 ring-white'></span>
			</div>
		</div>
	);
};

export default GlobalLoader;
