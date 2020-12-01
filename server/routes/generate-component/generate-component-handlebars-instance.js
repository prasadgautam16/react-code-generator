/** @format */

const generateComponentHbsInstance = require("../../helpers/common-handlebars-instance");

generateComponentHbsInstance.registerHelper("simpleElement", function (value) {
	return value ? "selfClosingElement" : "notSelfClosingElement";
});

generateComponentHbsInstance.registerPartial(
	"elementProperties",
	require("../../template/generate-component/partials/element-properties.hbs")
);

generateComponentHbsInstance.registerPartial(
	"elementControls",
	require("../../template/generate-component/partials/element-controls.hbs")
);

generateComponentHbsInstance.registerPartial(
	"selfClosingElement",
	require("../../template/generate-component/partials/self-closing-element.hbs")
);

generateComponentHbsInstance.registerPartial(
	"notSelfClosingElement",
	require("../../template/generate-component/partials/not-self-closing-element.hbs")
);

generateComponentHbsInstance.registerPartial(
	"containerElement",
	require("../../template/generate-component/partials/container-element.hbs")
);

const generateComponentTemplate = require("../../template/generate-component/generate-component.js.hbs");

module.exports = {
	generateComponentHbsInstance,
	generateComponentTemplate,
};
