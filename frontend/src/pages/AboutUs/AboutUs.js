import { Typography } from "@material-tailwind/react";
import React from "react";

const AboutUs = () => {
	return (
		<div className="my-20">
			<h1 className="text-center text-5xl">
				{" "}
				<span className="text-purple-900">About </span> Us
			</h1>
			<Typography className="capitalize about-us font-semibold text-center w-[80%] mx-auto mt-10">
				this is a website where you can buy any types of Bengali food Such as
				kacchi biryani,chicken chapp,dodhi etc. We make food from home and also
				serve food from home. if your are interest to buy food please go to
				services and checkout the service which is best for your health. we take
				order for any types of ceremony. we also take order for birthday cake.
				We take order from online and make food as you want.If you get some
				trouble with our services, then you can contact to us for fix the
				problem.
			</Typography>
		</div>
	);
};

export default AboutUs;
