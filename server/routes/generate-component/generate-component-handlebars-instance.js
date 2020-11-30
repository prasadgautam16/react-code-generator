/** @format */

const generateComponentHBSInstance = require("handlebars");
const {
	pascalCase,
	comparingTwoValues,
} = require("../../helpers/common-helper");

generateComponentHBSInstance.registerHelper("pascalCase", (str) => {
	return pascalCase(str);
});

generateComponentHBSInstance.registerHelper(
	"comparingTwoValues",
	(actualValue, expectedValue) => {
		return comparingTwoValues(actualValue, expectedValue);
	}
);

generateComponentHBSInstance.registerHelper("simpleElement", function (value) {
	return value ? "selfClosingElement" : "notSelfClosingElement";
});

generateComponentHBSInstance.registerPartial(
	"elementProperties",
	require("../../template/generate-component/partials/element-properties.hbs")
);

generateComponentHBSInstance.registerPartial(
	"elementControls",
	require("../../template/generate-component/partials/element-controls.hbs")
);

generateComponentHBSInstance.registerPartial(
	"selfClosingElement",
	require("../../template/generate-component/partials/self-closing-element.hbs")
);

generateComponentHBSInstance.registerPartial(
	"notSelfClosingElement",
	require("../../template/generate-component/partials/not-self-closing-element.hbs")
);

generateComponentHBSInstance.registerPartial(
	"containerElement",
	require("../../template/generate-component/partials/container-element.hbs")
);

const generateComponentTemplate = require("../../template/generate-component/generate-component.js.hbs");

module.exports = {
	generateComponentHBSInstance,
	generateComponentTemplate,
};
