/** @format */

const express = require("express");
const router = express.Router();
const config = require("config");

const { validationResult } = require("express-validator");
const { generateComponentCheck } = require("./generate-component-validator");
const fs = require("fs");
const { pascalCase } = require("./generate-component-helper");
const Handlebars = require("handlebars");

Handlebars.registerHelper("pascalCase", (str) => {
	return str
		.split(" ")
		.map((e) => e[0].toUpperCase() + e.slice(1).toLowerCase())
		.join("");
});

Handlebars.registerHelper("isCustomStyle", function (value) {
	return value === "Custom Style";
});

Handlebars.registerHelper("nameAsText", function (value) {
	return value === "text";
});

Handlebars.registerHelper("simpleElement", function (value) {
	return value ? "selfClosingElement" : "notSelfClosingElement";
});

Handlebars.registerPartial(
	"elementProperties",
	'{{#each this}} {{#if this.value}} {{#unless (nameAsText this.name)}} {{#if (isCustomStyle this.label)}} {{this.name}}={ {{{this.value}}} } {{else}} {{this.name}}="{{{this.value}}}" {{/if}} {{/unless}} {{/if}} {{/each}}'
);

//please don't put spacing for this will create {" "} or use ~
Handlebars.registerPartial(
	"elementControls",
	"{{#each this}}{{#if this.isContainer}}{{>containerElement this}}{{else}}{{>(simpleElement this.isSelfClosing) this}}{{/if}}{{/each}}"
);

Handlebars.registerPartial(
	"selfClosingElement",
	"<{{this.name}} {{>elementProperties this.properties}} />"
);

Handlebars.registerPartial(
	"notSelfClosingElement",
	"<{{this.name}} {{>elementProperties this.properties}}>{{#each this.properties}}{{~#if this.value}}{{#if (nameAsText this.name)}}{{this.value}}{{/if}}{{/if}}{{/each}}</{{this.name}}>"
);

Handlebars.registerPartial(
	"containerElement",
	"<{{this.name}} {{>elementProperties this.properties}}>{{>elementControls controls}}</{{this.name}}>"
);

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
