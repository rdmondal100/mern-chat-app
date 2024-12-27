import { useEffect } from "react";
import { getAllUsers, getLoggedInUserData } from "../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../redux/features/loaderSlice";
import GlobalLoader from "./globalLoader";
import { setUser, setAllUsers } from "../redux/features/userSlice";
import { setAllChats } from "../redux/features/chatSlice";
import { getAllChats } from "../services/chatService";

const ProtectedRoute = ({ children, authentication = true }) => {
	const { isAuthenticated, status, userData } = useSelector(
		(state) => state.userSlice
	);
	// console.log(isAuthenticated, status);
	const { loader } = useSelector((state) => state.loaderSlice);
	// console.log(isAuthenticated);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// console.log(status);

	useEffect(() => {
		if (!loader && status != "idle") {
			console.log(status);
			if (authentication && !isAuthenticated) {

					navigate("/login");
				
			} else if (!authentication && isAuthenticated) {
				

					navigate("/");
				
			}
		}
	}, [isAuthenticated,status]);

	//set logged in user data to the redux state
	const setLoggedInUserData = async () => {
		dispatch(showLoader());
		try {
			// console.log(loader);
			const response = await getLoggedInUserData();
			console.log(response);
			if (response.success) {
				dispatch(
					setUser({
						userData: response.data,
						isAuthenticated: true,
						status: "authenticated",
					})
				);
			} else {
				dispatch(
					setUser({
						userData: null,
						isAuthenticated: false,
						status: "unAuthenticated",
					})
				);
			}

			// console.log(response);
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(hideLoader());
		}
	};

	//set all the user data to the redux state
	const setAllUsersData = async () => {
		if (isAuthenticated) {
			try {
				const response = await getAllUsers();
				if (response.success) {
					dispatch(setAllUsers({ allUsersData: response.data }));
				} else {
					throw new Error("Failed to fetched all users ");
				}
			} catch (error) {
				console.log(error);
				toast.warning(error.message);
			}
		}
	};

	//set all chats to the redux state
	const setAllChatsData = async () => {
		if (isAuthenticated) {
			try {
				const userId = userData?._id;
				const response = await getAllChats(userId);
				// console.log(response);
				if (response.success) {
					dispatch(setAllChats({ allChats: response.data }));
				} else {
					throw new Error("Failed to fetched all chats");
				}
			} catch (error) {
				console.log(error);
				toast.warning(error.message);
			}
		}
	};
	useEffect(() => {
		if (isAuthenticated) {

			setAllUsersData();
			setAllChatsData();
		}
	}, [isAuthenticated,status]);

	useEffect(() => {
			setLoggedInUserData();

		
	}, []);

	if (loader) {
		return <GlobalLoader />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
