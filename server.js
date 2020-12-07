const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

const db = require("./models");

//MIDDLEWARE
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());

//Mongoose DB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myBookDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
	console.log("Mongoose successfully connected");
});

connection.on("error", (err) => {
	console.log("Mongoose connection error: ", err);
});

//ROUTES
app.get("/api/config", (req, res) => {
	res.json({
		success: true,
	});
});

app.get("/api/book", (req, res) => {
	db.Book.find({}).then((foundBooks) => {
		res.json(foundBooks);
	});
});

app.get("/api/book/:id", (req, res) => {
	db.Book.find({ _id: req.params.id }).then((foundBook) => {
		res.json(foundBook);
	});
});

app.post("/api/book", (req, res) => {
	db.Book.create(req.body).then((newBook) => {
		res.json(newBook);
	});
});
app.put("/api/book/:id", (req, res) => {
	db.Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
		(updatedBook) => {
			res.json(updatedBook);
		}
	);
});

app.delete("/api/book/:id", (req, res) => {
	db.Book.findOneAndDelete(req.params.id).then((result) => {
		res.json(result);
	});
});

//LISTENER
app.listen(PORT, () => {
	console.log(`App successfully connected to http://localhost:${PORT}`);
});
