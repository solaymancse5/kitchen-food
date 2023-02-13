import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Login from "../../Login/Login";
import AddServices from "../../pages/AddServices/AddServices";
import Home from "../../pages/Home/Home/Home";
import Services from "../../pages/Services/Services";
import Signup from "../../Signup/Signup";
import PrivateRoutes from "../PrivateRoute/PrivateRoutes";
import ServiceDetails from "../../pages/ServiceDetails/ServiceDetails";
import MyReviews from "../../pages/MyReviews/MyReviews";
import Blog from "../../pages/Blog/Blog";
import RouteErrorHandler from "../../pages/RouteErrorHandler/RouteErrorHandler";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/signup",
				element: <Signup></Signup>,
			},
			{
				path: "/addservices",
				element: (
					<PrivateRoutes>
						<AddServices></AddServices>
					</PrivateRoutes>
				),
			},
			{
				path: "/services",
				element: <Services></Services>,
			},
			{
				path: "/services/:id",
				element: <ServiceDetails></ServiceDetails>,
				loader: ({ params }) => {
					return fetch(
						`https://kitchen-food-server-eta.vercel.app/services/${params.id}`
					);
				},
			},
			{
				path: "/myreviews",
				element: (
					<PrivateRoutes>
						<MyReviews></MyReviews>
					</PrivateRoutes>
				),
			},
			{
				path: "/blogs",
				element: <Blog></Blog>,
			},
		],
	},
	{
		path: "*",
		element: <RouteErrorHandler></RouteErrorHandler>,
	},
]);

export default router;
