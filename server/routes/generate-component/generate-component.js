/** @format */

const express = require("express");
const router = express.Router();
const fs = require("fs");
const config = require("config");

const { pascalCase } = require("../../helpers/common-helper");
const {
	generateComponentTemplate,
} = require("./generate-component-handlebars-instance");

router.post("/", (req, res) => {
	try {
		req.body.forEach((element) => {
			const componentName = pascalCase(element.name);
			const componentPath = config.get("generatedPath") + componentName + ".js";
			fs.writeFileSync(componentPath, generateComponentTemplate(element));
		});

		res.send(`component js generated`);
	} catch (error) {
		return res.status(400).json({ errors: error });
	}
});

module.exports = router;
