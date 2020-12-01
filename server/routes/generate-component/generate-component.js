/** @format */

const express = require("express");
const router = express.Router();
const fs = require("fs");
const config = require("config");
const { validationResult } = require("express-validator");
const { generateComponentCheck } = require("./generate-component-validator");

const { pascalCase } = require("../../helpers/common-helper");
const {
	generateComponentTemplate,
} = require("./generate-component-handlebars-instance");

router.post("/", generateComponentCheck, (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const componentName = pascalCase(req.body.name);
		const componentPath = config.get("generatedPath") + componentName + ".js";

		fs.writeFileSync(componentPath, generateComponentTemplate(req.body));

		res.send(`generate ${componentName}.js at path ${componentPath}`);
	} catch (error) {
		return res.status(400).json({ errors: error });
	}
});

module.exports = router;
