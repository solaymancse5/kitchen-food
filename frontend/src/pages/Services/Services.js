import { Button } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Authprovider";
import Loading from "../shared/Loading/Loading";
import Service from "../shared/Service/Service";

const Services = () => {
	const { setTitle } = useContext(AuthContext);
	const [services, setServices] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`https://kitchen-food-server-eta.vercel.app/services`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setServices(data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		setTitle("Services | KitchenFood");
	}, []);

	return (
		<div className="my-[50px]">
			{loading ? (
				<Loading></Loading>
			) : (
				<>
					<div className="mt-[60px] grid gap-3 lg:grid-cols-3 md:grid-cols-2">
						{services?.map((service) => {
							return <Service key={service._id} service={service}></Service>;
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default Services;
