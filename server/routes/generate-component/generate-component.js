/** @format */

const express = require("express");
const router = express.Router();

const fs = require("fs");
const config = require("config");
const { validationResult } = require("express-validator");
const { generateComponentCheck } = require("./generate-component-validator");

const { pascalCase } = require("../../helpers/common-helper");
const {
	generateComponentHBSInstance,
	generateComponentTemplate,
} = require("./generate-component-handlebars-instance");

router.post("/", generateComponentCheck, (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		fs.writeFileSync(
			config.get("generatedPath") + pascalCase(req.body.name) + ".js",
			generateComponentTemplate(req.body)
		);
		res.send("generate component js");
	} catch (error) {
		return res.status(400).json({ errors: error });
	}
});

module.exports = router;
