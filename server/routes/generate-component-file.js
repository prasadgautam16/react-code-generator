/** @format */

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const fs = require("fs");

const Handlebars = require("handlebars");
// var template = Handlebars.compile("Handlebars {{doesWhat}}");
const compiledTemplate = require("../template/template.js.hbs");
router.post(
	"/generateComponentFile",
	[check("mainComponentName", "mainComponentName is required").not().isEmpty()],
	(req, res) => {
		const errors = validationResult(req);
		console.log(req.body);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		fs.writeFile(
			"./server/generated/" + req.body.mainComponentName + ".js",
			compiledTemplate({ name: req.body.mainComponentName }),
			function (err) {
				if (err) {
					console.error("Failed", err);
					return;
				}
				console.log("Created", err);
			}
		);
		res.send("generate component js");
	}
);

module.exports = router;
