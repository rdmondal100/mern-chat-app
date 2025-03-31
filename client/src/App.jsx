import { useSelector } from "react-redux";
import GlobalLoader from "./components/GlobalLoader";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";


function App() {
	const { loader } = useSelector((state) => state.loaderSlice);
	

	return (
		<>
			{loader && <GlobalLoader />}

			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute authentication={true}>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<ProtectedRoute authentication={true}>
							<Profile />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/chat/:chatId'
					element={
						<ProtectedRoute authentication={true}>
							<Home />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/login'
					element={
						<ProtectedRoute authentication={false}>
							<Login />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<ProtectedRoute authentication={false}>
							<Signup />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
