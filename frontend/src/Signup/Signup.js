import React, { useContext, useState } from "react";
import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Authprovider";

const Signup = () => {
	const [error, setError] = useState();
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/";
	const { createUser, updateUserProfile, handleGoogleSignIn } =
		useContext(AuthContext);
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const username = form.username.value;
		const photoUrl = form.imageUrl.value;
		const email = form.email.value;
		const password = form.password.value;

		if (password.length < 6) {
			setError("Password should be at least 6 characters");
			return;
		}

		createUser(email, password)
			.then((result) => {
				const user = result.user;
				// console.log(user);
				setError("");
				form.reset();
				handleUpdateUserProfile(username, photoUrl);
				const currentUser = {
					email: user.email,
				};

				fetch("https://kitchen-food-server-eta.vercel.app/jwt", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(currentUser),
				})
					.then((res) => res.json())
					.then((data) => {
						localStorage.setItem("access-token", data.token);
						navigate(from, { replace: true });
						console.log(data.token);
					})
					.catch((err) => {
						setError(err.message);
					});

				console.log(currentUser);
			})
			.catch((e) => {
				console.error(e);
				setError(e.message);
			});

		const handleUpdateUserProfile = (name, photoURL) => {
			const profile = {
				displayName: name,
				photoURL: photoURL,
			};

			updateUserProfile(profile)
				.then(() => {})
				.catch((error) => {
					setError(error.message);
					console.error(error);
				});
		};
	};
	const googleSignIn = () => {
		handleGoogleSignIn()
			.then((result) => {
				const user = result.user;
				const currentUser = {
					email: user.email,
				};
				fetch("https://kitchen-food-server-eta.vercel.app/jwt", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(currentUser),
				})
					.then((res) => res.json())
					.then((data) => {
						localStorage.setItem("access-token", data.token);
						console.log(data.token);
						setError("");
					})
					.catch((err) => {
						setError(err.message);
					});
				setError("");
				navigate(from, { replace: true });
			})
			.catch((error) => {
				console.error("error: ", error.message);
				setError(error.message);
			});
	};
	return (
		<div className="w-full">
			{error && (
				<Alert color="red" className="text-center w-[400px] mx-auto mt-5">
					{error}
				</Alert>
			)}
			<form
				onSubmit={handleSubmit}
				className="md:w-1/2 w-[95%] mx-auto mt-10 border shadow-md rounded-md p-10"
			>
				<h1 className="text-5xl text-center mb-10">SignUp</h1>
				<div className="sm:w-3/4 w-full mx-auto">
					<Input label="Username" name="username" type="text" required />
				</div>
				<div className="sm:w-3/4 w-full mx-auto mt-5">
					<Input label="ImageUrl" type="text" name="imageUrl" required />
				</div>
				<div className="sm:w-3/4 w-full mx-auto mt-5">
					<Input label="Email" type="email" name="email" required />
				</div>
				<div className="sm:w-3/4 w-full mx-auto mt-5">
					<Input label="Password" name="password" type="password" required />
				</div>
				<div className="text-center mt-5 sm:w-3/4 w-full mx-auto">
					<Button className="w-full bg-black" type="submit">
						Signup
					</Button>
				</div>

				<div className="text-center mt-2 flex sm:w-3/4 w-full mx-auto items-center">
					<span className="w-full block h-[1px] mr-2 bg-gray-600"></span>
					<h4 className="text-3xl ">OR</h4>
					<span className="w-full block h-[1px] ml-2 bg-gray-600"></span>
				</div>

				<div className="text-center mt-5 sm:w-3/4 w-full mx-auto">
					<Button
						className="w-full flex items-center bg-black justify-center"
						type="button"
						onClick={googleSignIn}
					>
						<FcGoogle className="w-6 h-6 mr-2"></FcGoogle>
						<span>Signup with google</span>
					</Button>
				</div>

				<Typography className="text-center mt-4 font-semibold">
					Already have an account?
					<Link to="/login" className="ml-2 text-purple-600">
						Login
					</Link>
				</Typography>
			</form>
		</div>
	);
};

export default Signup;
