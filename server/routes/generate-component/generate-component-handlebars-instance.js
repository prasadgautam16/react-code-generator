/** @format */

const generateComponentHBSInstance = require("handlebars");

generateComponentHBSInstance.registerHelper("pascalCase", (str) => {
	return str
		.split(" ")
		.map((e) => e[0].toUpperCase() + e.slice(1).toLowerCase())
		.join("");
});

generateComponentHBSInstance.registerHelper("isCustomStyle", function (value) {
	return value === "Custom Style";
});

generateComponentHBSInstance.registerHelper("nameAsText", function (value) {
	return value === "text";
});

generateComponentHBSInstance.registerHelper("simpleElement", function (value) {
	return value ? "selfClosingElement" : "notSelfClosingElement";
});

generateComponentHBSInstance.registerPartial(
	"elementProperties",
	'{{#each this}} {{#if this.value}} {{#unless (nameAsText this.name)}} {{#if (isCustomStyle this.label)}} {{this.name}}={ {{{this.value}}} } {{else}} {{this.name}}="{{{this.value}}}" {{/if}} {{/unless}} {{/if}} {{/each}}'
);

//please don't put spacing for this will create {" "} or use ~
generateComponentHBSInstance.registerPartial(
	"elementControls",
	"{{#each this}}{{#if this.isContainer}}{{>containerElement this}}{{else}}{{>(simpleElement this.isSelfClosing) this}}{{/if}}{{/each}}"
);

generateComponentHBSInstance.registerPartial(
	"selfClosingElement",
	"<{{this.name}} {{>elementProperties this.properties}} />"
);

generateComponentHBSInstance.registerPartial(
	"notSelfClosingElement",
	"<{{this.name}} {{>elementProperties this.properties}}>{{#each this.properties}}{{~#if this.value}}{{#if (nameAsText this.name)}}{{this.value}}{{/if}}{{/if}}{{/each}}</{{this.name}}>"
);

generateComponentHBSInstance.registerPartial(
	"containerElement",
	"<{{this.name}} {{>elementProperties this.properties}}>{{>elementControls controls}}</{{this.name}}>"
);

const generateComponentTemplate = require("../../template/generate-component/generate-component.js.hbs");

module.exports = {
	generateComponentHBSInstance,
	generateComponentTemplate,
};
