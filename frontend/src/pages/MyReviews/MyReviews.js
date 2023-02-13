import { Alert, Button, Textarea } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Authprovider";
import Loading from "../shared/Loading/Loading";
import { HiXMark } from "react-icons/hi2";
import { toast, ToastContainer } from "react-toastify";
const MyReviews = () => {
	const { user, setTitle } = useContext(AuthContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [myreviews, setMyReviews] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [review, setReview] = useState();
	const [servicetitle, setServiceTitle] = useState();
	const [updateId, setUpdateId] = useState(0);

	useEffect(() => {
		setTitle("MyReviews | KitchenFood");
	}, []);

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
		fetch(
			`https://kitchen-food-server-eta.vercel.app/reviews?email=${user?.email}`
		)
			.then((res) => res.json())
			.then((data) => {
				setMyReviews(data);
				setLoading(false);
				console.log(data);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
				console.log(err);
			});
	}, [user?.email]);

	const deleteHandler = (id) => {
		const isDelete = window.confirm("Are you want to delete it?");
		if (!isDelete) {
			return;
		}
		fetch(`https://kitchen-food-server-eta.vercel.app/reviews/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.deletedCount > 0) {
					const existReview = myreviews.filter((review) => review._id !== id);
					setMyReviews(existReview);
					notify("The Review is deleted");
					console.log(existReview);
				}
				setError("");
				console.log(data);
			})
			.catch((err) => {
				setError(err.message);
				console.log(err);
			});
	};
	const updateHandler = (id) => {
		setShowModal(true);
		setUpdateId(id);
		fetch(`https://kitchen-food-server-eta.vercel.app/review/${id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setReview(data.review);
				setServiceTitle(data.serviceName);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
				console.log(err);
			});
	};

	const cancelButton = () => {
		setReview("");
		setServiceTitle("");
		setShowModal(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const form = event.target;
		const formreview = form.review.value;

		if (!formreview) {
			alert("Review should not empty.");
			return;
		}
		if (updateId === 0) {
			return;
		}
		const updateReview = {
			review: formreview,
		};

		console.log(updateReview);

		fetch(`https://kitchen-food-server-eta.vercel.app/review/${updateId}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(updateReview),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.modifiedCount > 0) {
					const updatedReviews = myreviews.map((p) =>
						p._id === updateId ? { ...p, review: formreview } : p
					);
					console.log(updatedReviews);
					setMyReviews(updatedReviews);
					notify("The Review is updated.");
					form.reset();
				}
			})
			.catch((err) => console.log(err));
		setReview("");
		setServiceTitle("");
		setShowModal(false);
	};
	return (
		<div>
			{error && (
				<Alert color="red" className="text-center w-[400px] mx-auto mt-5">
					{error}
				</Alert>
			)}
			{loading ? (
				<div className="mt-5">
					<Loading></Loading>
				</div>
			) : (
				<>
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
					{showModal ? (
						<>
							<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
								<div className="relative my-6 mx-auto w-[500px]">
									{/*content*/}
									<div className="border-0 relative rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none">
										<span
											onClick={cancelButton}
											className="absolute top-3 right-3 cursor-pointer"
										>
											<HiXMark className="w-6 h-6"></HiXMark>
										</span>
										{/*header*/}

										<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
											<h3 className="text-3xl font-semibold">{servicetitle}</h3>
										</div>
										{/*body*/}
										<div className="relative p-6 w-full flex-auto">
											<form onSubmit={handleSubmit} className="w-full mx-auto ">
												<div className="w-full">
													<Textarea
														label="Review"
														defaultValue={review}
														name="review"
													/>
												</div>

												<div className="text-center w-full mt-10">
													<Button className="bg-purple-900" type="submit">
														Edit Review
													</Button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
							<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
						</>
					) : null}
					{myreviews?.length > 0 ? (
						<div className="overflow-x-auto w-full">
							<table class="shadow-lg bg-white  border-collapse w-full rounded-md my-10">
								<tr className="text-center">
									<th class="bg-black text-center text-white border  px-8 py-4">
										Service Name
									</th>
									<th class="bg-black text-white border text-center px-8 py-4">
										Review
									</th>
									<th class="bg-black text-white border text-center px-8 py-4">
										Action
									</th>
								</tr>
								{myreviews.map((myreview) => {
									return (
										<tr>
											<td class="border px-8 py-4">{myreview.serviceName}</td>
											<td class="border px-8 py-4">{myreview.review}</td>
											<td class="border px-8 py-4">
												<div className="text-center flex sm:flex-row flex-col">
													<Button
														className="mr-5 bg-red-700"
														onClick={() => deleteHandler(myreview._id)}
													>
														Delete
													</Button>
													<Button
														className="bg-green-900 md:mt-0 mt-5"
														onClick={() => updateHandler(myreview._id)}
													>
														Edit
													</Button>
												</div>
											</td>
										</tr>
									);
								})}
							</table>
						</div>
					) : (
						<div>
							<h4 className="text-red-800 my-10 text-xl text-center">
								No reviews were added
							</h4>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default MyReviews;
