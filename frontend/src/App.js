import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Routes/Routes";

function App() {
	return (
		<div className="max-w-screen-2xl mx-auto">
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
