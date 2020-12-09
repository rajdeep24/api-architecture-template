const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

const BookController = require("./controllers/bookController");
const AuthorController = require("./controllers/authorController");
const UserController = require("./controllers/userController");

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Mongoose DB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myBookDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
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

app.use(BookController);
app.use(AuthorController);
app.use(UserController);

//LISTENER
app.listen(PORT, () => {
	console.log(`App successfully connected to http://localhost:${PORT}`);
});
