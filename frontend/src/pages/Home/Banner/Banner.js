import { Button, Typography } from "@material-tailwind/react";
import { FcDown } from "react-icons/fc";
import React from "react";
import "./banner.css";

const Banner = () => {
	return (
		<div className="overlay mt-2">
			<div className="banner-image">
				<h1 className="text-center sm:text-5xl text-4xl font-semibold text-white  md:pt-[150px] pt-[70px]">
					Welcome To My{" "}
					<span className="text-purple-900">
						Kitchen <br className="" /> Food
					</span>{" "}
					Website
				</h1>
				<Typography className="text-center w-[80%] mx-auto text-white text-base mt-5 capitalize">
					this is a website where you can buy any types of food which is made
					from home. If you are interested you can check{" "}
					<br className="xl:block hidden" /> our Services so that you can chose
					your favorite foods.
				</Typography>

				<div className="text-center mt-4">
					<Button className="bg-purple-900 flex mx-auto items-center">
						<FcDown className="animate-bounce w-6 h-6"></FcDown>{" "}
						<span className="capitalize">Scroll Down</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Banner;
