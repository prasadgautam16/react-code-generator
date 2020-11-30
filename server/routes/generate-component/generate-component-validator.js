/** @format */

const { check } = require("express-validator");

module.exports = {
	generateComponentCheck: [check("name", "name is required").not().isEmpty()],
};
