const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
	db.User.find({})
		.populate("books")
		.then((foundUsers) => {
			res.json(foundUsers);
		});
});

router.get("/:id", (req, res) => {
	db.User.find({ _id: req.params.id }).then((foundUser) => {
		res.json(foundUser);
	});
});

router.post("/", (req, res) => {
	db.User.create(req.body).then((newUser) => {
		res.json(newUser);
	});
});
router.put("/:id", (req, res) => {
	db.User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
		(updatedUser) => {
			res.json(updatedUser);
		}
	);
});

router.delete("/:id", (req, res) => {
	db.User.findOneAndDelete(req.params.id).then((result) => {
		res.json(result);
	});
});

module.exports = router;
