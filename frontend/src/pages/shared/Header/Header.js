import { useState, useEffect, useContext } from "react";
import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/Authprovider";

const Header = () => {
	const [openNav, setOpenNav] = useState(false);

	const { user, logOut } = useContext(AuthContext);

	console.log("user", user);

	useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-normal"
			>
				<Link to="/" className="flex items-center">
					Home
				</Link>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-normal"
			>
				<Link to="/blogs" className="flex items-center">
					Blog
				</Link>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-normal"
			>
				<Link to="/services" className="flex items-center">
					Services
				</Link>
			</Typography>
			{user && user.uid && (
				<>
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-normal"
					>
						<Link to="/myreviews" className="flex items-center">
							MyReviews
						</Link>
					</Typography>
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-normal"
					>
						<Link to="/addservices" className="flex items-center">
							AddService
						</Link>
					</Typography>
				</>
			)}
		</ul>
	);

	return (
		<Navbar className="mx-auto max-w-screen-2xl py-2 px-4 lg:px-8 lg:py-4">
			<div className="container mx-auto flex items-center justify-between text-blue-gray-900">
				<Link
					to="/"
					variant="small"
					className="mr-4 cursor-pointer py-1.5 font-normal"
				>
					<span className="font-bold text-2xl">KitchenFood</span>
				</Link>
				<div className="hidden lg:block">{navList}</div>
				{user && user.uid ? (
					<Button
						color="red"
						onClick={logOut}
						size="sm"
						className="hidden lg:inline-block"
					>
						<span>logOut</span>
					</Button>
				) : (
					<Link to="/login">
						<Button
							variant="gradient"
							size="sm"
							className="hidden lg:inline-block"
						>
							<span>logIn</span>
						</Button>
					</Link>
				)}

				<IconButton
					variant="text"
					className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							className="h-6 w-6"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</IconButton>
			</div>
			<MobileNav open={openNav}>
				{navList}
				{}

				{user && user.uid ? (
					<Button
						color="red"
						size="sm"
						onClick={logOut}
						fullWidth
						className="mb-2"
					>
						<span>logOut</span>
					</Button>
				) : (
					<Link to="/login">
						<Button variant="gradient">
							<span>logIn</span>
						</Button>
					</Link>
				)}
			</MobileNav>
		</Navbar>
	);
};

export default Header;
