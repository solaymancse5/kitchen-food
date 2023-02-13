import React from "react";

const Review = ({ review }) => {
	const { name, imageUrl } = review;
	return (
		<div className="flex  flex-col shadow my-5 sm:px-10 px-2 border-2 rounded-md  py-5 w-[80%] mx-auto">
			<div className="author">
				<img src={imageUrl} alt="" className="w-16 h-16 rounded-full" />
				<h6 className="text-[14px] mt-2 text-left">{name}</h6>
			</div>
			<h3 className="text-lg capitalize mt-4 break-all">{review.review}</h3>
		</div>
	);
};

export default Review;
