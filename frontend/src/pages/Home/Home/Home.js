import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/Authprovider";
import AboutUs from "../../AboutUs/AboutUs";
import ContactUs from "../../ContactUs/ContactUs";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";

const Home = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Home | kitchenFood");
	}, []);
	return (
		<div>
			<Banner></Banner>
			<Services></Services>
			<AboutUs></AboutUs>
			<ContactUs></ContactUs>
		</div>
	);
};

export default Home;
