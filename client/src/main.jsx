import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";


createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			<ToastContainer/>
			<App/>
		</BrowserRouter>
	</Provider>
);
