import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Typography,
} from "@material-tailwind/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";
import "./service.css";

const Service = ({ service }) => {
	const { title, imageUrl, _id, price, description } = service;
	console.log(imageUrl);
	return (
		<Card className="lg:w-80 md:w-72 card-box mx-auto mt-[50px]">
			<CardHeader color="blue" className="relative h-56">
				<PhotoProvider>
					<PhotoView src={imageUrl}>
						<img
							src={imageUrl}
							style={{ objectFit: "cover" }}
							alt="img-blur-shadow"
							className="h-full w-full cursor-pointer"
						/>
					</PhotoView>
				</PhotoProvider>
			</CardHeader>
			<CardBody className="text-center">
				<Typography variant="h5" className="mb-2">
					{title}
				</Typography>
				<Typography className="break-all">
					{description && description.length > 100
						? `${description.substring(0, 100) + "...."}`
						: description}
				</Typography>
				<Typography className="text-black mt-4">
					<span className="font-bold">Price:</span> BDT {price}
				</Typography>
				<Link to={`/services/${_id}`}>
					<Button className="bg-black mt-4">View Details</Button>
				</Link>
			</CardBody>
		</Card>
	);
};

export default Service;
