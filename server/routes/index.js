const express = require("express");
const { modelName } = require("../models/persona");
const app = express();


app.use("/usuario", require("./usuario"));
app.use("/puesto", require("./puesto"));
app.use("/empresa", require("./empresa"));
app.use("/persona", require("./persona"));


module.exports = app