import { Button, Textarea, Typography } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../contexts/Authprovider";
import Loading from "../shared/Loading/Loading";
import Review from "../shared/Review/Review";

const ServiceDetails = () => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user, setTitle } = useContext(AuthContext);
	const service = useLoaderData();
	const { title, description, imageUrl, _id, price } = service;
	useEffect(() => {
		fetch(`https://kitchen-food-server-eta.vercel.app/reviews/${_id}`)
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				console.log(data);
				setReviews(data);
			})
			.catch((err) => console.log(err));
	}, [_id]);

	useEffect(() => {
		setTitle(` ${title} | KitchenFood `);
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!user) {
			notify("Please login to add a review.");
			return;
		}

		const form = event.target;
		const review = form.review.value;

		if (!review) {
			alert("Review should not empty.");
			return;
		}
		const createReview = {
			review,
			name: user.displayName,
			email: user.email,
			imageUrl: user.photoURL,
			service: _id,
			serviceName: title,
		};
		fetch("https://kitchen-food-server-eta.vercel.app/reviews", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${localStorage.getItem("access-token")}`,
			},
			body: JSON.stringify(createReview),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.acknowledged) {
					notify("The review is added");
					setReviews([createReview, ...reviews]);
					form.reset();
				}
			})
			.catch((err) => console.log(err));
	};
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
	return (
		<div>
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
			<div className="mt-10 service-details-box">
				<div className="lg:w-1/2 sm:w-3/4 w-[90%] mx-auto">
					<PhotoProvider>
						<PhotoView src={imageUrl}>
							<img
								src={imageUrl}
								style={{ objectFit: "cover" }}
								alt="img-blur-shadow"
								className="w-full h-[400px] rounded-md  cursor-pointer"
							/>
						</PhotoView>
					</PhotoProvider>
				</div>
				<h1 className="text-5xl text-center my-5 font-semibold">{title}</h1>
				<div>
					<Typography className="w-[80%] mx-auto text-left">
						<b className="font-bold text-xl mr-2">Description:</b>
						{description}
					</Typography>
				</div>
				<div className="w-[80%] mx-auto my-5 flex items-center justify-between">
					<p>
						<b className="mr-2 font-bold">Price:</b>
						BDT{price}
					</p>
					<p>
						<Button className="bg-purple-800">Buy Now</Button>
					</p>
				</div>
			</div>
			<div className="add-review-box my-[10px]">
				<hr />
				<form
					onSubmit={handleSubmit}
					className="lg:w-1/2 sm:w-3/4 w-full mx-auto my-10"
				>
					{user && (
						<div className="w-[95%] mx-auto">
							<Textarea label="Review" name="review" />
						</div>
					)}

					<div className=" w-3/4 text-center mx-auto">
						<Button className="bg-purple-900" type="submit">
							Add Review
						</Button>
					</div>
				</form>
				<hr />
			</div>

			<div className="reviews">
				<h1 className="text-5xl my-5 text-center">Reviews</h1>
				<hr />
				{loading ? (
					<div className="mt-5">
						<Loading></Loading>
					</div>
				) : (
					<div className="reviews-box my-10">
						{reviews?.length > 0 ? (
							<>
								{reviews.map((review) => (
									<Review review={review} key={review._id}></Review>
								))}
							</>
						) : (
							<h1 className="text-center capitalize text-red-800 text-4xl my-10">
								{" "}
								there is no review
							</h1>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ServiceDetails;
