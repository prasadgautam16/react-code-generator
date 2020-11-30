/** @format */

const express = require("express");

const app = express();

//Middleware Init
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
	res.send("API running");
});

//Define routes
app.use("/api", require("./server/routes/generate-component"));
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
	console.log(`Server log listening at ${PORT}`);
});
