import { Button, Input, Textarea } from "@material-tailwind/react";
import React, { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../contexts/Authprovider";

const AddServices = () => {
	const { user, setTitle } = useContext(AuthContext);
	const notify = (name) => {
		console.log("toast");
		toast(name, {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	useEffect(() => {
		setTitle("AddServices | KitchenFood");
	}, []);
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const price = form.price.value;
		const title = form.title.value;
		const imageUrl = form.imageUrl.value;
		const description = form.description.value;
		console.log(price, imageUrl, title, description);
		const createService = {
			user: user.displayName,
			email: user.email,
			price,
			title,
			imageUrl,
			description,
		};
		fetch("https://kitchen-food-server-eta.vercel.app/services", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${localStorage.getItem("access-token")}`,
			},
			body: JSON.stringify(createService),
		})
			.then((res) => res.json())
			.then((data) => {
				notify("The Service is added");
				form.reset();
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="mb-10">
			<div className="w-full">
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
				<form
					onSubmit={handleSubmit}
					className="md:w-1/2 w-[90%] mx-auto mt-10 border shadow-md rounded-md p-10"
				>
					<h1 className="text-5xl text-center mb-10">Create Service</h1>
					<div className="sm:w-3/4 w-full mx-auto">
						<Input label="Title" name="title" type="text" required />
					</div>
					<div className="sm:w-3/4 w-full mx-auto mt-5">
						<Input label="Price" name="price" type="number" required />
					</div>
					<div className="sm:w-3/4 w-full mx-auto mt-5">
						<Input label="ImageUrl" name="imageUrl" type="text" required />
					</div>
					<div className="sm:w-3/4 w-full mx-auto mt-5">
						<Textarea label="Description" name="description" required />
					</div>

					<div className="text-center mt-10 sm:w-3/4 w-full mx-auto">
						<Button className="w-full bg-black" type="submit">
							Create Service
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddServices;
