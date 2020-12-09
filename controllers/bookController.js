const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/api/book", (req, res) => {
	db.Book.find({})
		.populate("author", "firstName lastName")
		.then((foundBooks) => {
			res.json(foundBooks);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: true,
				data: null,
				message: "Failed to retrieve all books.",
			});
		});
});

router.get("/api/book/:id", (req, res) => {
	db.Book.find({ _id: req.params.id }).then((foundBook) => {
		res.json(foundBook);
	});
});

router.post("/api/book", (req, res) => {
	db.Book.create(req.body).then((newBook) => {
		res.json(newBook);
	});
});
router.put("/api/book/:id", (req, res) => {
	db.Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
		(updatedBook) => {
			res.json(updatedBook);
		}
	);
});

router.delete("/api/book/:id", (req, res) => {
	db.Book.findOneAndDelete(req.params.id).then((result) => {
		res.json(result);
	});
});

module.exports = router;
