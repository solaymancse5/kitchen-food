import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
	return (
		<footer>
			<hr />
			<div className="py-10 flex sm:flex-row flex-col justify-center items-center  sm:justify-around">
				<div className="flex items-center">
					<FaFacebook className="w-6 h-6 cursor-pointer mx-5"></FaFacebook>
					<FaTwitter className="w-6 h-6 cursor-pointer mr-5"></FaTwitter>
					<FaInstagram className="w-6 h-6 cursor-pointer"></FaInstagram>
				</div>
				<p className="text-black font-bold text-center sm:mt-0 mt-5 text-xl">
					Copyright &copy; 2022 KitchenFood.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
