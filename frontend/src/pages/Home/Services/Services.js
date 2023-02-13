import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../shared/Loading/Loading";
import Service from "../../shared/Service/Service";

const Services = () => {
	const [services, setServices] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`https://kitchen-food-server-eta.vercel.app/services?size=3`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setServices(data);
				setLoading(false);
			});
	}, []);
	return (
		<div>
			<h1 className="text-5xl text-center my-5">My Services</h1>
			{loading ? (
				<Loading></Loading>
			) : (
				<>
					<div className="mt-[60px] grid gap-3 lg:grid-cols-3 md:grid-cols-2">
						{services?.map((service) => {
							return <Service key={service._id} service={service}></Service>;
						})}
					</div>
					<div className="my-[40px] text-center">
						<Link to="/services">
							<Button className="bg-purple-900">View All</Button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default Services;
