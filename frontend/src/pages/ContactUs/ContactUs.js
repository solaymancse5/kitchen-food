import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import { FaMailBulk, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
	return (
		<div className="my-20 w-[90%] mx-auto">
			<h1 className="text-center text-5xl">
				{" "}
				Contact <span className="text-purple-900"> Us</span>
			</h1>
			<div className="flex lg:flex-row flex-col mt-10 items-center">
				<div className="left-side flex-1 w-full">
					<div className="flex items-center border rounded-md p-5 ">
						<div className="bg-purple-600 w-12 h-12 flex justify-center items-center rounded-full">
							<FaPhoneAlt className="w-6 h-6 text-white"></FaPhoneAlt>
						</div>
						<div className="ml-5">
							<h4 className="text-2xl mb-3">Contact On Phone</h4>
							<p className="text-xl">+012-3456-7891</p>
							<p className="text-xl">+012-3456-7892</p>
						</div>
					</div>
					<div className="flex items-center border my-2 rounded-md p-5">
						<div className="bg-purple-600 w-12 h-12 flex justify-center items-center rounded-full">
							<FaMailBulk className="w-6 h-6 text-white"></FaMailBulk>
						</div>
						<div className="ml-5">
							<h4 className="text-2xl mb-3">Contact on mail</h4>
							<p className="text-xl">demomail@demo.com</p>
							<p className="text-xl">demomail2@demo.com</p>
						</div>
					</div>
					<div className="flex items-center border  rounded-md p-5">
						<div className="bg-purple-600 w-12 h-12 flex justify-center items-center rounded-full">
							<FaMapMarkerAlt className="w-6 h-6 text-white"></FaMapMarkerAlt>
						</div>
						<div className="ml-5">
							<h4 className="text-2xl mb-3">Contact address</h4>
							<p className="text-xl">
								121 King Street, Melbourne, United States
							</p>
						</div>
					</div>
				</div>

				<div className="right-side w-full flex-1 lg:ml-10 mx-auto py-[50px]">
					<form className="w-full mx-auto border shadow-md rounded-md p-10">
						<div className="w-full mx-auto">
							<Input label="Name" name="email" type="text" required />
						</div>
						<div className="w-full mx-auto mt-10">
							<Input label="Email" name="email" type="email" required />
						</div>
						<div className="w-full mx-auto mt-10">
							<Textarea label="Message" required />
						</div>

						<div className="text-center mt-5 w-full mx-auto">
							<Button className="w-full bg-black" type="submit">
								Mail
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
