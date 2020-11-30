/** @format */

const express = require("express");
const router = express.Router();
const config = require("config");

const { validationResult } = require("express-validator");
const { generateComponentCheck } = require("./generate-component-validator");
const fs = require("fs");
const { pascalCase } = require("./generate-component-helper");
const Handlebars = require("../handlebars");

const componentTemplate = require("../template/template.js.hbs");

router.post("/generateComponentFile", generateComponentCheck, (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		fs.writeFileSync(
			config.get("generatedPath") + pascalCase(req.body.name) + ".js",
			componentTemplate(req.body)
		);
		res.send("generate component js");
	} catch (error) {
		return res.status(400).json({ errors: error });
	}
});

module.exports = router;
