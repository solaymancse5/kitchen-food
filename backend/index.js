const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());
if ((process.env.NODE_ENV = "dev")) {
	app.use(morgan("dev"));
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wjvzlqr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

function verifyJWT(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).send({ message: "unauthorized access" });
	}
	const token = authHeader.split(" ")[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
		if (err) {
			return res.status(403).send({ message: "Forbidden access" });
		}
		req.decoded = decoded;
		next();
	});
}

async function run() {
	const servicesCollection = client.db("kitchenFoodDb").collection("services");
	const reviewsCollection = client.db("KitchenFood").collection("reviews");
	app.post("/jwt", (req, res) => {
		const user = req.body;
		const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "30d",
		});
		res.send({ token });
	});

	app.post("/services", verifyJWT, async (req, res) => {
		const service = req.body;
		const createService = {
			...service,
			createdDate: new Date(),
		};
		const result = await servicesCollection.insertOne(createService);
		res.send(result);
	});

	app.get("/services", async (req, res) => {
		const size = Number(req.query.size);
		const cursor = servicesCollection.find({});
		const result = await cursor.limit(size).sort({ createdDate: -1 }).toArray();
		res.send(result);
	});

	app.get("/services/:id", async (req, res) => {
		const id = req.params.id;

		const query = {
			_id: ObjectId(id),
		};
		const result = await servicesCollection.findOne(query);
		res.send(result);
	});

	app.post("/reviews", verifyJWT, async (req, res) => {
		const review = req.body;
		const createReview = {
			...review,
			createdDate: new Date(),
		};
		const result = await reviewsCollection.insertOne(createReview);
		res.send(result);
	});

	app.get("/reviews/:id", async (req, res) => {
		const id = req.params.id;
		const query = {
			service: id,
		};
		const cursor = reviewsCollection.find(query);
		const result = await cursor.sort({ createdDate: -1 }).toArray();
		res.send(result);
	});

	app.get("/reviews", async (req, res) => {
		const email = req.query.email;
		const query = {
			email: email,
		};

		const cursor = reviewsCollection.find(query);
		const reviews = await cursor.toArray();
		res.send(reviews);
	});

	app.delete("/reviews/:id", async (req, res) => {
		const id = req.params.id;
		const query = {
			_id: ObjectId(id),
		};

		const result = await reviewsCollection.deleteOne(query);
		res.send(result);
	});

	app.get("/review/:id", async (req, res) => {
		const id = req.params.id;
		const query = {
			_id: ObjectId(id),
		};
		const result = await reviewsCollection.findOne(query);
		res.send(result);
	});
	app.patch("/review/:id", async (req, res) => {
		const id = req.params.id;
		const data = req.body;
		const filter = {
			_id: ObjectId(id),
		};
		const options = { upsert: true };
		const updateDoc = {
			$set: {
				review: data.review,
			},
		};
		const result = await reviewsCollection.updateOne(
			filter,
			updateDoc,
			options
		);
		res.send(result);
	});
}

run().catch((err) => console.log(err));
app.get("/", async (req, res) => {
	res.send("Hi,Friends");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
