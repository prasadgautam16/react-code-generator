/** @format */

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const fs = require("fs");
router.post(
	"/generateComponentFile",
	[check("mainComponentName", "mainComponentName is required").not().isEmpty()],
	(req, res) => {
		console.log(req.body);

		const errors = validationResult(req);
		console.log(req.body);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		fs.writeFile(
			"./server/generated/" + req.body.mainComponentName + ".js",
			req.body.mainComponentName,
			function (err) {
				if (err) {
					console.error("Failed", err);
					return;
				}
				console.log("Created", err);
			}
		);
		console.log(req.body);
		res.send("generate component js");
	}
);

module.exports = router;
